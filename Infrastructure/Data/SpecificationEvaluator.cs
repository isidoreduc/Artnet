using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> specification)
        {
            var query = inputQuery;

            query = specification.Criteria != null ? query.Where(specification.Criteria) : query;

            query = specification.OrderBy != null ? query.OrderBy(specification.OrderBy) : query;

            query = specification.OrderByDescending != null ? query.OrderByDescending(specification.OrderByDescending) : query;
            // paging specification should be after all other sorting or filtering, so you sort from all, not just paginated
            query = specification.IsPagingEnabled ? query.Skip(specification.Skip).Take(specification.Take) : query;

            query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));
            return query;
        }
    }
}