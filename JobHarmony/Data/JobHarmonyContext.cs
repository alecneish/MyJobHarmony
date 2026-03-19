using JobHarmony.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace JobHarmony.Data;

public class JobHarmonyContext : DbContext
{
    public JobHarmonyContext(DbContextOptions<JobHarmonyContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Applicant> Applicants => Set<Applicant>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<QuizQuestion> QuizQuestions => Set<QuizQuestion>();
    public DbSet<QuizOption> QuizOptions => Set<QuizOption>();
    public DbSet<QuizResult> QuizResults => Set<QuizResult>();
    public DbSet<SavedJob> SavedJobs => Set<SavedJob>();
    public DbSet<JobTag> JobTags => Set<JobTag>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Store List<string> as comma-separated values in SQLite
        var stringListComparer = new ValueComparer<List<string>>(
            (a, b) => a != null && b != null && a.SequenceEqual(b),
            v => v.Aggregate(0, (h, s) => HashCode.Combine(h, s.GetHashCode())),
            v => v.ToList()
        );

        modelBuilder.Entity<Job>()
            .Property(j => j.Tags)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
            )
            .Metadata.SetValueComparer(stringListComparer);

        modelBuilder.Entity<Applicant>()
            .Property(a => a.Skills)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
            )
            .Metadata.SetValueComparer(stringListComparer);

        // Applicant → User (one-to-one)
        modelBuilder.Entity<Applicant>()
            .HasOne(a => a.User)
            .WithOne(u => u.Applicant)
            .HasForeignKey<Applicant>(a => a.UserId);

        // Applicant → QuizResult (one-to-one)
        modelBuilder.Entity<QuizResult>()
            .HasOne(r => r.Applicant)
            .WithOne(a => a.QuizResult)
            .HasForeignKey<QuizResult>(r => r.ApplicantId);

        // SavedJob unique constraint (one applicant can't save the same job twice)
        modelBuilder.Entity<SavedJob>()
            .HasIndex(s => new { s.ApplicantId, s.JobId })
            .IsUnique();

        // User email must be unique
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
