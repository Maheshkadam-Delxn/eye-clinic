import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db/connection";
import Appointment from "../../../../../models/Appoinment";
import Patient from "../../../../../models/Patient";

export async function POST(req) {
  try {
    await connectDB();

    const { doctorId, patientName, patientPhone, patientEmail, gender, age, appointmentDate, appointmentTime, reason } = await req.json();

    // Validate required fields
    if (!doctorId || !patientName || !patientPhone || !appointmentDate || !gender || !age || !appointmentTime || !reason) {
      return NextResponse.json(
        { message: "All fields are required: doctorID, patientName, patientPhone, age, gender, appointmentDate, appointmentTime, reason" },
        { status: 400 }
      );
    }

    // Check if user exists by phone
    let user = await Patient.findOne({ phone: patientPhone });

    if (!user) {
      // Ensure email uniqueness
      if (patientEmail) {
        const existingUserWithEmail = await Patient.findOne({ email: patientEmail });
        if (existingUserWithEmail) {
          return NextResponse.json(
            { message: "Email already registered with another account." },
            { status: 400 }
          );
        }
      }

      // Create new user
      user = new Patient({
        name: patientName,
        phone: patientPhone,
        gender,
        age,
        email: patientEmail || undefined,
      });

      try {
        await user.save();
      } catch (error) {
        if (error.code === 11000) {
          return NextResponse.json(
            { message: "Phone number or email already exists." },
            { status: 400 }
          );
        }
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
    }

    // Check if the patient already has an appointment on the same date
    const existingPatientAppointment = await Appointment.findOne({ appointmentDate, patientPhone });

    if (existingPatientAppointment) {
      return NextResponse.json(
        { message: "You have already booked an appointment for this date." },
        { status: 400 }
      );
    }

    // Check for existing appointments for the same doctor on the same date
    const appointmentCount = await Appointment.countDocuments({
      appointmentDate,
      doctor: doctorId, // Ensure limit is per doctor
    });
    if (appointmentCount >= 3) {
      return NextResponse.json(
        { message: "This date is fully booked. Please choose another date." },
        { status: 400 }
      );
    }

    // Create the appointment (storing only appointmentDate as string)
    const newAppointment = new Appointment({
      patientName,
      patientPhone,
      patientEmail: patientEmail || undefined,
      age,
      gender,
      appointmentDate, // Store only the date in YYYY-MM-DD format
      appointmentTime, // Keep time separately
      reason,
      doctorId: doctorId,
      patientId: user._id,
      status: "pending",
    });

    await newAppointment.save();

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: newAppointment,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import connectDB from "../../../../lib/db/connection";
// import Appointment from "../../../../models/Appoinment";
// import Patient from "../../../../models/Patient";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const {doctorId, patientName, patientPhone, patientEmail, gender, age , appointmentDate, appointmentTime, reason } = await req.json();

//     // Validate required fields
//     if (!doctorId || !patientName || !patientPhone || !appointmentDate || !gender || !age|| !appointmentTime || !reason) {
//       return NextResponse.json(
//         { message: "All fields are required: doctorID, patientName, patientPhone, age, gender, appointmentDate, appointmentTime, reason" },
//         { status: 400 }
//       );
//     }

//     // Combine appointment date & time into a single Date object
//     const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);

//     // if want to store the date in IST format
//     // appointmentDateTime.setHours(appointmentDateTime.getHours() + 5);
//     // appointmentDateTime.setMinutes(appointmentDateTime.getMinutes() + 30);
//     // Check if user exists by phone
//     let user = await Patient.findOne({ phone: patientPhone });

//     if (!user) {
//       // Ensure email uniqueness
//       if (patientEmail) {
//         const existingUserWithEmail = await Patient.findOne({ email: patientEmail });
//         if (existingUserWithEmail) {
//           return NextResponse.json(
//             { message: "Email already registered with another account." },
//             { status: 400 }
//           );
//         }
//       }

//       // Create new user
//       user = new Patient({
//         name: patientName,
//         phone: patientPhone,
//         gender: gender,
//         age: age,
//         email: patientEmail || undefined,
//       });

//       try {
//         await user.save();
//       } catch (error) {
//         if (error.code === 11000) {
//           return NextResponse.json(
//             { message: "Phone number or email already exists." },
//             { status: 400 }
//           );
//         }
//         console.error("Error creating user:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//       }
//     }

//     // Check if the patient already has an appointment in this time slot
//     const existingPatientAppointment = await Appointment.findOne({ appointmentDateTime, patientPhone });

//     if (existingPatientAppointment) {
//       return NextResponse.json(
//         { message: "You have already booked an appointment for this time slot." },
//         { status: 400 }
//       );
//     }
//     // Check for existing appointment at the same time
//     const appointmentCount = await Appointment.countDocuments({
//       appointmentDateTime,
//       doctor: doctorId, // Ensure limit is per doctor
//     });
//     if (appointmentCount >= 3) {
//       return NextResponse.json(
//         { message: "This time slot is fully booked. Please choose another slot." },
//         { status: 400 }
//       );
//     }

//     // Create the appointment
//     const newAppointment = new Appointment({
//       patientName,
//       patientPhone,
//       patientEmail: patientEmail || undefined,
//       age:age,
//       gender:gender,
//       appointmentDateTime,
//       reason,
//       doctor: doctorId,
//       status: "pending",
//     });
    
//     await newAppointment.save();

//     return NextResponse.json(
//       {
//         message: "Appointment booked successfully",
//         appointment: newAppointment,
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
