using Microsoft.EntityFrameworkCore;
using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Data;

public class QuizDbContext : DbContext
{
    public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuizSession> QuizSessions => Set<QuizSession>();
    public DbSet<Response> Responses => Set<Response>();
    public DbSet<DimensionScore> DimensionScores => Set<DimensionScore>();
    public DbSet<CareerProfile> CareerProfiles => Set<CareerProfile>();
    public DbSet<CareerMatch> CareerMatches => Set<CareerMatch>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Question>(e =>
        {
            e.HasKey(q => q.Id);
            e.Property(q => q.Text).IsRequired().HasMaxLength(500);
            e.Property(q => q.Dimension).IsRequired().HasMaxLength(50);
            e.Property(q => q.Subdimension).HasMaxLength(50);
            e.Property(q => q.Section).IsRequired().HasMaxLength(50);
            e.Property(q => q.QuestionFormat).IsRequired().HasMaxLength(20);
            e.Property(q => q.Tier).IsRequired().HasMaxLength(10);
            e.HasIndex(q => new { q.Tier, q.Section, q.SectionOrder });
        });

        modelBuilder.Entity<QuizSession>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.Tier).IsRequired().HasMaxLength(10);
        });

        modelBuilder.Entity<Response>(e =>
        {
            e.HasKey(r => r.Id);
            e.HasOne(r => r.Session)
                .WithMany(s => s.Responses)
                .HasForeignKey(r => r.SessionId)
                .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(r => r.Question)
                .WithMany(q => q.Responses)
                .HasForeignKey(r => r.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(r => new { r.SessionId, r.QuestionId }).IsUnique();
        });

        modelBuilder.Entity<DimensionScore>(e =>
        {
            e.HasKey(d => d.Id);
            e.HasOne(d => d.Session)
                .WithMany(s => s.DimensionScores)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.Cascade);
            e.Property(d => d.Dimension).IsRequired().HasMaxLength(50);
            e.Property(d => d.Subdimension).HasMaxLength(50);
        });

        modelBuilder.Entity<CareerProfile>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Title).IsRequired().HasMaxLength(100);
            e.Property(c => c.Category).IsRequired().HasMaxLength(50);
            e.Property(c => c.Description).HasMaxLength(1000);
        });

        modelBuilder.Entity<CareerMatch>(e =>
        {
            e.HasKey(m => m.Id);
            e.HasOne(m => m.Session)
                .WithMany(s => s.CareerMatches)
                .HasForeignKey(m => m.SessionId)
                .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(m => m.CareerProfile)
                .WithMany(c => c.Matches)
                .HasForeignKey(m => m.CareerProfileId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
