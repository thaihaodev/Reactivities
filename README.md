Domain <> Application(trung giang) <> API
Liên kết giữa chúng:

Ứng dụng (Application Layer) là nơi trung gian giữa Domain Layer và API. Nó sử dụng logic kinh doanh từ Domain Layer để thực hiện các yêu cầu từ API.

API sử dụng ứng dụng để thực hiện các yêu cầu từ người dùng hoặc ứng dụng khác. API định rõ các endpoint và phương thức mà các bên ngoài có thể gọi để tương tác với hệ thống.

Domain Layer không biết gì về API hoặc ứng dụng cụ thể mà nó phục vụ. Nó chỉ cung cấp logic kinh doanh và quy tắc.
Mối liên kết giữa các thành phần này thường được thực hiện thông qua Dependency Injection, khi ứng dụng và API chèn các dịch vụ từ Domain Layer để sử dụng logic kinh doanh và dữ liệu từ domain. Dependency Injection giúp giữ cho các thành phần độc lập và dễ quản lý.

--->>> Sử dụng mediatR để liên kết
Cài mediatR vào Application

Controller không còn lấy dữ liệu nữa, chỉ có handler mới lấy dữ liệu rồi đẩy sang controller thôi
Từ controller dùng Mediator để lấy dữ liệu từ Handler

Cấu hình ở program
