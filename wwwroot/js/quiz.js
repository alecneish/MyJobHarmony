(function () {
    'use strict';

    var currentIndex = 0;
    var cards = $('.question-card');
    var total = parseInt($('#totalQuestions').val(), 10);
    var answered = parseInt($('#answeredCount').text(), 10);

    function showCard(index) {
        cards.hide();
        var card = cards.eq(index);
        card.fadeIn(200);

        var section = card.data('section');
        $('.section-label').text(section);

        $('#btnPrev').prop('disabled', index === 0);

        var isLast = index === cards.length - 1;
        if (isLast && answered >= total) {
            $('#btnNext').hide();
            $('#completeForm').show();
        } else {
            $('#btnNext').show();
            $('#completeForm').hide();
        }
    }

    function updateProgress() {
        var pct = Math.round((answered / total) * 100);
        $('.progress-bar').css('width', pct + '%');
        $('#answeredCount').text(answered);

        if (answered >= total && currentIndex === cards.length - 1) {
            $('#btnNext').hide();
            $('#completeForm').show();
        }
    }

    // Find first unanswered question to start on
    var firstUnanswered = 0;
    cards.each(function (i) {
        if ($(this).find('.likert-btn.active').length === 0 && firstUnanswered === 0 && i > 0) {
            firstUnanswered = i;
            return false;
        }
    });
    // If all answered, start at beginning; if some answered, start at first unanswered
    if (answered > 0 && answered < total) {
        currentIndex = firstUnanswered;
    }

    showCard(currentIndex);

    // Likert button click
    $(document).on('click', '.likert-btn', function () {
        var btn = $(this);
        var card = btn.closest('.question-card');
        var questionId = card.data('question-id');
        var value = parseInt(btn.data('value'), 10);

        var wasAlreadyAnswered = card.find('.likert-btn.active').length > 0;
        card.find('.likert-btn').removeClass('active');
        btn.addClass('active');

        if (!wasAlreadyAnswered) {
            answered++;
        }

        $.ajax({
            url: '/Quiz/SaveAnswer',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ questionId: questionId, answerValue: value }),
            success: function (data) {
                answered = data.answered;
                updateProgress();
            }
        });

        // Auto-advance after a short delay
        setTimeout(function () {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            } else {
                updateProgress();
            }
        }, 300);
    });

    $('#btnNext').on('click', function () {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            showCard(currentIndex);
        }
    });

    $('#btnPrev').on('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            showCard(currentIndex);
        }
    });

    // Keyboard navigation
    $(document).on('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
            }
        } else if (e.key >= '1' && e.key <= '5') {
            var card = cards.eq(currentIndex);
            card.find('.likert-btn[data-value="' + e.key + '"]').click();
        }
    });
})();
