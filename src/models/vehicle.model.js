import mongoose, { model } from "mongoose";

const vehicleCollection = "vehicles";

const serviceSchema = new mongoose.Schema(
  {
    service_date: {
      type: Date,
      required: true,
    },
    service_type: {
      type: String,
      required: true,
    },
    service_description: {
      type: String,
      required: true,
    },
    service_mileage: {
      type: Number,
      required: true,
    },
    service_cost: {
      type: Number,
      required: true,
    },
    service_location: {
      type: String,
      required: true,
    },
    next_service_mileage: {
      type: Number,
      required: false,
    },
    next_service_date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const documentationSchema = new mongoose.Schema(
  {
    document_name: {
      type: String,
      required: true,
      enum: [
        "national_license",
        "charge_license-course",
        "charge_license-psychophysical",
        "insurance",
        "registration",
        "technical_review",
        "transport_authorization",
        "other",
      ],
    },
    expiration_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    vehicle_registration: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    thumbnails: {
      type: Buffer,
      required: false,
    },
    services: [serviceSchema],
    documentation: [documentationSchema],
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

const vehicleModel = mongoose.model(vehicleCollection, vehicleSchema);

export default vehicleModel;
