using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobHarmony.Areas.Quiz.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CareerProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Category = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    Openness = table.Column<double>(type: "REAL", nullable: false),
                    Conscientiousness = table.Column<double>(type: "REAL", nullable: false),
                    Extraversion = table.Column<double>(type: "REAL", nullable: false),
                    Agreeableness = table.Column<double>(type: "REAL", nullable: false),
                    EmotionalStability = table.Column<double>(type: "REAL", nullable: false),
                    Realistic = table.Column<double>(type: "REAL", nullable: false),
                    Investigative = table.Column<double>(type: "REAL", nullable: false),
                    Artistic = table.Column<double>(type: "REAL", nullable: false),
                    Social = table.Column<double>(type: "REAL", nullable: false),
                    Enterprising = table.Column<double>(type: "REAL", nullable: false),
                    Conventional = table.Column<double>(type: "REAL", nullable: false),
                    ValAutonomy = table.Column<double>(type: "REAL", nullable: false),
                    ValSecurity = table.Column<double>(type: "REAL", nullable: false),
                    ValChallenge = table.Column<double>(type: "REAL", nullable: false),
                    ValService = table.Column<double>(type: "REAL", nullable: false),
                    ValWorkLifeBalance = table.Column<double>(type: "REAL", nullable: false),
                    EnvPace = table.Column<double>(type: "REAL", nullable: false),
                    EnvCollaboration = table.Column<double>(type: "REAL", nullable: false),
                    EnvStructure = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerProfiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Text = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Dimension = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Subdimension = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Section = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    SectionOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    QuestionFormat = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    IsReverseScored = table.Column<bool>(type: "INTEGER", nullable: false),
                    Weight = table.Column<double>(type: "REAL", nullable: false),
                    Tier = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuizSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Tier = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    StartedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IsComplete = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CareerMatches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CareerProfileId = table.Column<int>(type: "INTEGER", nullable: false),
                    MatchScore = table.Column<double>(type: "REAL", nullable: false),
                    Rank = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerMatches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerMatches_CareerProfiles_CareerProfileId",
                        column: x => x.CareerProfileId,
                        principalTable: "CareerProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CareerMatches_QuizSessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "QuizSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DimensionScores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Dimension = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Subdimension = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    RawScore = table.Column<double>(type: "REAL", nullable: false),
                    NormalizedScore = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimensionScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DimensionScores_QuizSessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "QuizSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    QuestionId = table.Column<int>(type: "INTEGER", nullable: false),
                    AnswerValue = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Responses_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Responses_QuizSessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "QuizSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerMatches_CareerProfileId",
                table: "CareerMatches",
                column: "CareerProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerMatches_SessionId",
                table: "CareerMatches",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_DimensionScores_SessionId",
                table: "DimensionScores",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Tier_Section_SectionOrder",
                table: "Questions",
                columns: new[] { "Tier", "Section", "SectionOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Responses_QuestionId",
                table: "Responses",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_SessionId_QuestionId",
                table: "Responses",
                columns: new[] { "SessionId", "QuestionId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CareerMatches");

            migrationBuilder.DropTable(
                name: "DimensionScores");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropTable(
                name: "CareerProfiles");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuizSessions");
        }
    }
}
