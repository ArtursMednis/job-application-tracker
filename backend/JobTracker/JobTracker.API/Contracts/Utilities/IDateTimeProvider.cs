namespace JobTracker.API.Contracts.Utilities;

public interface IDateTimeProvider
{
    DateTime Now { get; }
}
