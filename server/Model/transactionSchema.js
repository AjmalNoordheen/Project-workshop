const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
        
      PaymentType: {
        type: String,
      },
    //   At withdrawel time there will be no Booking Id so we insert userId
      holder:{ 
        type:String
      },
      date: {
        type: Date,
      },
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings",
      },
      accDetails: [
        {
          accNo: {
            type: Number,
          },
        },
      ],    
})

const transactinModel = mongoose.model("transactions", transactionSchema);

module.exports = transactinModel;


   