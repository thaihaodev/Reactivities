using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    // public class Handler(AppDbContext context) : IRequestHandler<Command>
    // {
    //     public async Task Handle(Command request, CancellationToken cancellationToken)
    //     {
    //         var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Activity not found");

    //         activity.Title = request.Activity.Title;
    //         activity.Description = request.Activity.Description;
    //         activity.Category = request.Activity.Category;
    //         activity.Date = request.Activity.Date;
    //         activity.City = request.Activity.City;
    //         activity.Venue = request.Activity.Venue;

    //         var success = await context.SaveChangesAsync(cancellationToken) > 0;

    //         if (!success)
    //         {
    //             throw new Exception("Problem saving changes");
    //         }
    //     }
    // }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Activity not found");

            //Package AutoMapper to map the properties from request.Activity to activity
            //Trái cũ, Phải mới. Ánh xạ từ request.Activity sang activity
            mapper.Map(request.Activity, activity);

            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
            {
                throw new Exception("Problem saving changes");
            }
        }
    }
}
