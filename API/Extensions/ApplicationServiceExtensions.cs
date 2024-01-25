using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Dòng này thêm dịch vụ ApiExplorer vào container dịch vụ. ApiExplorer là một công cụ cho phép tạo tài liệu API tự động và tương tác với các điểm cuối (endpoints) API
            services.AddEndpointsApiExplorer();

            // Dòng này thêm dịch vụ SwaggerGen vào container dịch vụ. SwaggerGen là một công cụ cho phép tạo tài liệu API dựa trên chuẩn OpenAPI/Swagger.
            services.AddSwaggerGen();

            //Cấu hình CORS để viết api
            //Thêm dịch vụ CORS vào container DI (Dependency Injection) của ứng dụng
            services.AddCors(opt =>
            {
                // định nghĩa một chính sách CORS có tên "CorsPolicy". Chính sách này là tập hợp các quy tắc cấu hình cho CORS middleware.
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader() //Cho phép tất cả các loại header HTTP từ nguồn gốc khác.
                    .AllowAnyMethod() //Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, vv.).
                    .WithOrigins("http://localhost:3000"); //Cho phép các yêu cầu từ nguồn có địa chỉ là "http://localhost:3000". Điều này thường được sử dụng để cho phép yêu cầu từ trang web chạy trên máy chủ localhost.
                });
            });

            //đăng ký một DataContext (DbContext) trong container dịch vụ của ứng dụng và cấu hình nó để sử dụng cơ sở dữ liệu SQLite với chuỗi kết nối được định nghĩa trong tệp cấu hình. 
            //Điều này cho phép ứng dụng sử dụng Entity Framework Core để tương tác với cơ sở dữ liệu SQLite thông qua DataContext
            services.AddDbContext<DataContext>(opt => opt.UseSqlite(config.GetConnectionString("DefaultConnection")));

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;
        }
    }
}