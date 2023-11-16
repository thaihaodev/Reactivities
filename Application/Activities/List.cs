using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //Hander (class con Query)
        //là một loại yêu cầu (request) được sử dụng trong mô hình CQRS. Nó kế thừa từ IRequest<List<Activity>>, 
        //cho biết rằng khi bạn gửi một yêu cầu Query, bạn mong đợi nhận về một danh sách (List) các hoạt động (Activity)
        public class Query : IRequest<List<Activity>> { }

        //RequestHandler (Class con Handler)
        //Đây là nơi xử lý yêu cầu Query(ở trên). Nó kế thừa từ IRequestHandler<Query, List<Activity>>, 
        //cho biết rằng nó có khả năng xử lý yêu cầu kiểu Query và trả về một danh sách hoạt động.
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            //Đây là phương thức xử lý yêu cầu Query
            //Nó chấp nhận một đối tượng request kiểu Query (Bên Handler), nhưng trong trường hợp này, thông qua MediatR, 
            //request thường không chứa nhiều thông tin vì chức năng lấy danh sách hoạt động đã được xác định trước.
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}