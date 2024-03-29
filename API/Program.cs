//Đây là bước đầu tiên trong việc tạo một ứng dụng ASP.NET Core. 
//WebApplication.CreateBuilder(args) tạo một đối tượng WebApplication và cấu hình nó bằng cách sử dụng các thông số được truyền vào thông qua biến args. 
//builder sẽ được sử dụng để cấu hình ứng dụng và tạo ra các dịch vụ cần thiết.
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Dòng này thêm dịch vụ điều khiển (controllers) vào container dịch vụ. 
//Controllers là các thành phần quan trọng trong ASP.NET Core để xử lý các yêu cầu HTTP từ client.
builder.Services.AddControllers();

builder.Services.AddApplicationServices(builder.Configuration);
//Dòng này sử dụng builder để xây dựng ứng dụng. Sau khi ứng dụng được xây dựng, bạn có thể cấu hình nó và thêm các middleware.
var app = builder.Build();

// Configure the HTTP request pipeline.
//Đây là một điều kiện kiểm tra xem ứng dụng đang chạy trong môi trường phát triển hay không. Nếu ứng dụng đang trong môi trường phát triển, 
//các dòng code trong khối này sẽ được thực hiện
if (app.Environment.IsDevelopment())
{
    // Nếu ứng dụng đang trong môi trường phát triển, hai dòng này được sử dụng để kích hoạt và hiển thị tài liệu API bằng cách sử dụng Swagger UI. 
    //Swagger UI là một giao diện web cho phép xem tài liệu và thử nghiệm các API.
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Middleware này cho phép xác thực và ủy quyền trong ứng dụng.
app.UseAuthorization();

//Middleware này định tuyến các yêu cầu HTTP đến các controllers và actions tương ứng để xử lý chúng.
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.UseCors("CorsPolicy");
// Dòng này bắt đầu chạy ứng dụng và lắng nghe các yêu cầu HTTP đến server
app.Run();
