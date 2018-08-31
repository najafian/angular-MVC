using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
   public interface IDashboardRepository<TEntity> where TEntity:class
    {
        TEntity get(int i);
        IEnumerable<TEntity> getAll();
        IEnumerable<TEntity> find(Expression<Func<TEntity, bool>> predicate);
        void add(TEntity entity);
        void addRange(IEnumerable<TEntity> entities);
        void remove(TEntity entity);
        void removeRange(IEnumerable<TEntity> entities);
    }
}
