namespace JobHarmony.Models;

public class JobTag
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public string TagName { get; set; } = "";

    public Job Job { get; set; } = null!;
}
