using JobTracker.API.Contracts.Utilities;

namespace JobTracker.API.Utilities;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now => DateTime.Now;
}
