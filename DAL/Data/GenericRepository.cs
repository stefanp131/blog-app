using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly DataContext _context;
    public GenericRepository(DataContext context)
    {
        this._context = context;
    }

    public async Task AddAsync(T entity)
    {
        await this._context.Set<T>().AddAsync(entity);
    }

    public void Update(T entity)
    {
        this._context.Entry(entity).State = EntityState.Modified;
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await this._context.Set<T>().FindAsync(id);
    }

    public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await this._context.Set<T>().ToListAsync();
    }

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).ToListAsync();
    }

    private IQueryable<T> ApplySpecification(ISpecification<T> spec)
    {
        return SpecificationEvaluator<T>.GetQuery(this._context.Set<T>().AsQueryable(), spec);
    }
}