using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> GetById(int id);
        Task<T> GetEntityWithSpecification(ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetAllWithSpecification(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> countSpec);

        // these ares synchronous because they just affect the context db, it is the job of the unit of work to actually make changes to database
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}