using System.Collections.Generic;

namespace API.Helpers;

public class Pagination<T> where T : class
{
    public Pagination(int pageIndex, int pageSize, IReadOnlyCollection<T> data)
    {
        PageIndex = pageIndex;
        PageSize = pageSize;
        Data = data;
    }

    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public IReadOnlyCollection<T> Data { get; set; }
}