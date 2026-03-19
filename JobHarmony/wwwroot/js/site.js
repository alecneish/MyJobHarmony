(function ($) {
    'use strict';

    var JH = window.JH = {};

    // ==========================================
    // Snackbar
    // ==========================================
    JH.Snackbar = (function () {
        var timer = null;
        var $el, $msg, $undo, $close;

        function init() {
            $el = $('#jh-snackbar');
            $msg = $el.find('.jh-snackbar-message');
            $undo = $el.find('.jh-snackbar-undo');
            $close = $el.find('.jh-snackbar-close');

            $close.on('click', hide);
        }

        function show(message, undoFn) {
            if (timer) clearTimeout(timer);

            $msg.text(message);

            if (undoFn) {
                $undo.show().off('click').on('click', function () {
                    undoFn();
                    hide();
                });
            } else {
                $undo.hide();
            }

            $el.addClass('show');
            timer = setTimeout(hide, 4000);
        }

        function hide() {
            if (timer) clearTimeout(timer);
            $el.removeClass('show');
        }

        return { init: init, show: show, hide: hide };
    })();

    // ==========================================
    // Quiz
    // ==========================================
    JH.Quiz = (function () {
        var current = 0;
        var total = 0;
        var answers = {}; // { questionIndex: { trait, weight, optionIndex } }

        function init() {
            total = parseInt($('#jh-total-questions').val(), 10);
            if (!total) return;

            updateProgress();
            updateNav();
        }

        function selectOption(questionIdx, optionIdx, trait, weight) {
            answers[questionIdx] = { trait: trait, weight: weight, optionIndex: optionIdx };

            // Update visual selection
            $('.jh-quiz-card[data-question="' + questionIdx + '"] .jh-quiz-option')
                .removeClass('selected');
            $('.jh-quiz-option[data-question="' + questionIdx + '"][data-option="' + optionIdx + '"]')
                .addClass('selected');

            $('#jh-quiz-next').prop('disabled', false);
        }

        function next() {
            if (!answers[current]) return;

            if (current >= total - 1) {
                computeAndSave();
                return;
            }

            $('.jh-quiz-card[data-question="' + current + '"]').hide();
            current++;
            $('.jh-quiz-card[data-question="' + current + '"]').show();

            // Re-enable next if already answered
            $('#jh-quiz-next').prop('disabled', !answers[current]);
            updateProgress();
            updateNav();
        }

        function back() {
            if (current <= 0) return;

            $('.jh-quiz-card[data-question="' + current + '"]').hide();
            current--;
            $('.jh-quiz-card[data-question="' + current + '"]').show();

            $('#jh-quiz-next').prop('disabled', !answers[current]);
            updateProgress();
            updateNav();
        }

        function updateProgress() {
            var pct = Math.round(((current + 1) / total) * 100);
            $('#jh-progress-fill').css('width', pct + '%');
            $('#jh-progress-label').text('Question ' + (current + 1) + ' of ' + total);
            $('#jh-progress-pct').text(pct + '%');
        }

        function updateNav() {
            $('#jh-quiz-back').css('visibility', current > 0 ? 'visible' : 'hidden');
            $('#jh-quiz-next').text(current >= total - 1 ? 'See Results' : 'Next \u2192');
        }

        function computeAndSave() {
            var traits = {
                openness: 0,
                conscientiousness: 0,
                extraversion: 0,
                agreeableness: 0,
                emotionalStability: 0
            };
            var traitCounts = {
                openness: 0,
                conscientiousness: 0,
                extraversion: 0,
                agreeableness: 0,
                emotionalStability: 0
            };

            for (var key in answers) {
                var a = answers[key];
                if (traits.hasOwnProperty(a.trait)) {
                    traits[a.trait] += a.weight;
                    traitCounts[a.trait]++;
                }
            }

            // Normalize: each trait max possible = 3 per question answered for that trait
            // Scale to 0-100
            var result = {};
            for (var t in traits) {
                var maxPossible = traitCounts[t] * 3;
                if (maxPossible > 0) {
                    result[t] = Math.round((traits[t] / maxPossible) * 100);
                } else {
                    result[t] = 50; // default if no questions for this trait
                }
                // Clamp
                result[t] = Math.min(100, Math.max(0, result[t]));
            }

            // Determine motivation type
            var motivation = determineMotivation(result);
            result.motivationType = motivation.type;
            result.motivationDescription = motivation.description;
            result.motivationIcon = motivation.icon;

            // Find dominant trait (highest scoring)
            var traitNames = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'];
            var dominantTrait = traitNames.reduce(function (a, b) {
                return result[b] > result[a] ? b : a;
            });

            localStorage.setItem('jh-quiz-results', JSON.stringify(result));

            // POST results to the backend, then redirect
            fetch('/api/quiz/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    openness: result.openness,
                    conscientiousness: result.conscientiousness,
                    extraversion: result.extraversion,
                    agreeableness: result.agreeableness,
                    emotionalStability: result.emotionalStability,
                    dominantTrait: dominantTrait,
                    motivationType: result.motivationType
                })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.success) {
                    JH.Snackbar.show('Your results have been saved!');
                }
                setTimeout(function () { window.location.href = '/Quiz/Results'; }, 1000);
            })
            .catch(function () {
                // If the API call fails, redirect anyway so the user isn't stuck
                window.location.href = '/Quiz/Results';
            });
        }

        function determineMotivation(scores) {
            var dominant = 'openness';
            var maxScore = 0;
            for (var t in scores) {
                if (scores[t] > maxScore) {
                    maxScore = scores[t];
                    dominant = t;
                }
            }

            var types = {
                openness: {
                    type: 'The Innovator',
                    description: 'You thrive on creativity and new ideas. You\'re driven by curiosity and love exploring uncharted territory.',
                    icon: '\uD83D\uDCA1'
                },
                conscientiousness: {
                    type: 'The Achiever',
                    description: 'You\'re goal-oriented and detail-driven. You find satisfaction in completing tasks with precision and excellence.',
                    icon: '\uD83C\uDFAF'
                },
                extraversion: {
                    type: 'The Connector',
                    description: 'You\'re energized by people and thrive in collaborative environments. Building relationships is your superpower.',
                    icon: '\uD83E\uDD1D'
                },
                agreeableness: {
                    type: 'The Harmonizer',
                    description: 'You\'re empathetic and cooperative. You excel at creating supportive environments where everyone can succeed.',
                    icon: '\uD83D\uDC9A'
                },
                emotionalStability: {
                    type: 'The Anchor',
                    description: 'You\'re calm under pressure and bring stability to any team. Your resilience and composure inspire confidence.',
                    icon: '\u2693'
                }
            };

            return types[dominant] || types.openness;
        }

        return { init: init, selectOption: selectOption, next: next, back: back };
    })();

    // ==========================================
    // Results
    // ==========================================
    JH.Results = (function () {
        function init() {
            var stored = localStorage.getItem('jh-quiz-results');
            if (!stored) {
                // Use server defaults, animate bars with data-default values
                animateBars(null);
                return;
            }

            var data = JSON.parse(stored);

            // Update motivation card
            if (data.motivationType) {
                $('#jh-result-type').text(data.motivationType);
            }
            if (data.motivationDescription) {
                $('#jh-result-desc').text(data.motivationDescription);
            }
            if (data.motivationIcon) {
                $('#jh-result-icon').text(data.motivationIcon);
            }

            // Update trait values and bars
            var traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'];
            traits.forEach(function (t) {
                if (data[t] !== undefined) {
                    $('.jh-trait-value[data-trait="' + t + '"]').text(data[t] + '%');
                }
            });

            animateBars(data);
        }

        function animateBars(data) {
            setTimeout(function () {
                $('.jh-trait-fill').each(function () {
                    var $bar = $(this);
                    var trait = $bar.data('trait');
                    var value = data && data[trait] !== undefined ? data[trait] : parseInt($bar.data('default'), 10);
                    $bar.css('width', value + '%');
                });
            }, 300);
        }

        return { init: init };
    })();

    // ==========================================
    // Jobs (Save/Unsave)
    // ==========================================
    JH.Jobs = (function () {
        var STORAGE_KEY = 'jh-saved-jobs';

        function init() {
            var saved = getSavedIds();
            // Update all save button states
            $('.jh-save-btn').each(function () {
                var id = $(this).data('job-id').toString();
                if (saved.indexOf(id) !== -1) {
                    markSaved($(this));
                }
            });
        }

        function getSavedIds() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            } catch (e) {
                return [];
            }
        }

        function toggleSave($btn) {
            var id = $btn.data('job-id').toString();
            var saved = getSavedIds();
            var idx = saved.indexOf(id);

            if (idx !== -1) {
                // Unsave
                saved.splice(idx, 1);
                markUnsaved($btn);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                JH.Snackbar.show('Job removed from saved', function () {
                    saved.push(id);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                    markSaved($btn);
                    if (isSavedPage()) filterSavedPage();
                });
            } else {
                // Save
                saved.push(id);
                markSaved($btn);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                JH.Snackbar.show('Job saved!', function () {
                    var s = getSavedIds();
                    var i = s.indexOf(id);
                    if (i !== -1) s.splice(i, 1);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
                    markUnsaved($btn);
                    if (isSavedPage()) filterSavedPage();
                });
            }

            if (isSavedPage()) {
                setTimeout(filterSavedPage, 50);
            }
        }

        function markSaved($btn) {
            $btn.addClass('saved');
            $btn.find('.save-icon').html('&#9829;');
        }

        function markUnsaved($btn) {
            $btn.removeClass('saved');
            $btn.find('.save-icon').html('&#9825;');
        }

        function isSavedPage() {
            return $('#jh-saved-page').length > 0;
        }

        function filterSavedPage() {
            var saved = getSavedIds();
            var visibleCount = 0;

            $('#jh-saved-job-list .jh-job-card').each(function () {
                var id = $(this).data('job-id').toString();
                if (saved.indexOf(id) !== -1) {
                    $(this).show();
                    visibleCount++;
                } else {
                    $(this).hide();
                }
            });

            if (visibleCount === 0) {
                $('#jh-saved-empty').show();
            } else {
                $('#jh-saved-empty').hide();
            }
        }

        return { init: init, toggleSave: toggleSave, filterSavedPage: filterSavedPage };
    })();

    // ==========================================
    // Filters
    // ==========================================
    JH.Filters = (function () {
        var debounceTimer = null;

        function init() {
            // Debounced search
            $('#jh-search').on('input', function () {
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(applyFilters, 250);
            });
        }

        function togglePanel() {
            var isOpen = $('#jh-filter-panel').hasClass('show');
            if (isOpen) {
                closePanel();
            } else {
                openPanel();
            }
        }

        function openPanel() {
            $('#jh-filter-panel').addClass('show');
            $('#jh-filter-overlay').addClass('show');
        }

        function closePanel() {
            $('#jh-filter-panel').removeClass('show');
            $('#jh-filter-overlay').removeClass('show');
        }

        function clearFilters() {
            $('.jh-filter-checkbox').prop('checked', false);
            $('#jh-search').val('');
            applyFilters();
        }

        function applyFilters() {
            var search = ($('#jh-search').val() || '').toLowerCase();

            // Gather checked filters
            var typeFilters = [];
            var locationFilters = [];
            var tagFilters = [];

            $('.jh-filter-checkbox:checked').each(function () {
                var filter = $(this).data('filter');
                var val = $(this).val();
                if (filter === 'type') typeFilters.push(val);
                else if (filter === 'location') locationFilters.push(val);
                else if (filter === 'tags') tagFilters.push(val);
            });

            var visibleCount = 0;
            $('#jh-job-list .jh-job-card').each(function () {
                var $card = $(this);
                var title = ($card.data('title') || '').toString().toLowerCase();
                var company = ($card.data('company') || '').toString().toLowerCase();
                var type = ($card.data('type') || '').toString();
                var location = ($card.data('location') || '').toString();
                var tags = ($card.data('tags') || '').toString();

                var matchSearch = !search ||
                    title.indexOf(search) !== -1 ||
                    company.indexOf(search) !== -1 ||
                    tags.toLowerCase().indexOf(search) !== -1;

                var matchType = typeFilters.length === 0 || typeFilters.indexOf(type) !== -1;
                var matchLocation = locationFilters.length === 0 || locationFilters.indexOf(location) !== -1;

                var matchTags = true;
                if (tagFilters.length > 0) {
                    var cardTags = tags.split(',');
                    matchTags = tagFilters.some(function (tf) {
                        return cardTags.indexOf(tf) !== -1;
                    });
                }

                if (matchSearch && matchType && matchLocation && matchTags) {
                    $card.show();
                    visibleCount++;
                } else {
                    $card.hide();
                }
            });

            if (visibleCount === 0) {
                $('#jh-no-results').addClass('show');
            } else {
                $('#jh-no-results').removeClass('show');
            }
        }

        return { init: init, togglePanel: togglePanel, openPanel: openPanel, closePanel: closePanel, clearFilters: clearFilters, applyFilters: applyFilters };
    })();

    // ==========================================
    // Page Router & Event Delegates
    // ==========================================
    $(function () {
        JH.Snackbar.init();

        var path = window.location.pathname.toLowerCase();

        // Quiz page
        if (path.indexOf('/quiz') !== -1 && path.indexOf('/results') === -1) {
            JH.Quiz.init();
        }

        // Results page
        if (path.indexOf('/quiz/results') !== -1) {
            JH.Results.init();
        }

        // Jobs page
        if (path.indexOf('/jobs') !== -1) {
            JH.Jobs.init();
            JH.Filters.init();
        }

        // Saved page
        if (path.indexOf('/jobs/saved') !== -1) {
            JH.Jobs.filterSavedPage();
        }

        // --- Global Event Delegates ---

        // Quiz option click
        $(document).on('click', '.jh-quiz-option', function () {
            var $opt = $(this);
            var qIdx = parseInt($opt.data('question'), 10);
            var oIdx = parseInt($opt.data('option'), 10);
            var trait = $opt.data('trait');
            var weight = parseInt($opt.data('weight'), 10);
            JH.Quiz.selectOption(qIdx, oIdx, trait, weight);
        });

        // Quiz navigation
        $(document).on('click', '#jh-quiz-next', function () {
            JH.Quiz.next();
        });

        $(document).on('click', '#jh-quiz-back', function () {
            JH.Quiz.back();
        });

        // Save button click
        $(document).on('click', '.jh-save-btn', function (e) {
            e.preventDefault();
            JH.Jobs.toggleSave($(this));
        });

        // Filter toggle
        $(document).on('click', '#jh-filter-toggle', function () {
            JH.Filters.togglePanel();
        });

        // Filter clear
        $(document).on('click', '#jh-filter-clear', function () {
            JH.Filters.clearFilters();
        });

        // Filter apply
        $(document).on('click', '#jh-filter-apply', function () {
            JH.Filters.applyFilters();
            JH.Filters.closePanel();
        });

        // Filter sidebar close button
        $(document).on('click', '#jh-filter-close', function () {
            JH.Filters.closePanel();
        });

        // Filter overlay click to close
        $(document).on('click', '#jh-filter-overlay', function () {
            JH.Filters.closePanel();
        });

        // Checkbox change triggers filter
        $(document).on('change', '.jh-filter-checkbox', function () {
            JH.Filters.applyFilters();
        });
    });

})(jQuery);
