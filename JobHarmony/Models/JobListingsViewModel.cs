namespace JobHarmony.Models;

public class JobListingsViewModel
{
    public List<Job> Jobs { get; set; } = new();
    public List<string> AllTags { get; set; } = new();
    public List<string> AllTypes { get; set; } = new();
    public List<string> AllLocations { get; set; } = new();
}
