using System;
using System.Threading.Tasks;
using DAL.Entities;

namespace DAL.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> Complete();
}
