import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    fullName: { type: String, },
    phone: { type: String },
    address: { type: String },
    urlPicture: { type: String },
    status: { type: Boolean, default: true }
})

export const staffSchema = new mongoose.Schema({
    staffId: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phone: { type: String },
    address: { type: String },
    urlPicture: { type: String },
    status: { type: Boolean, default: true },
})

export const catergorySchema = new mongoose.Schema({
    name: {type: String, required: true }
})

export const screenSchema = new mongoose.Schema({
    technology: { type: String },
    resolution: {type: String },
    size: { type: String },
    touch: { type: String },
    touchScreen: { type: String }
})

export const behindCameraSchema = new mongoose.Schema({
    resolution: {type: String },
    video: { type: String },
    flash: { type: Boolean, default: true },
    extraCamera: { type: [String] }
})

export const frontCameraSchema = new mongoose.Schema({
    resolution: {type: String },
    video: { type: Boolean, default: true },
    extraCamera: { type: [String] }
})

export const CPUSchema = new mongoose.Schema({
    cpu: { type: String }, 
    chipset: { type: String },
    numberOfCore: { type: Number },
    speed: { type: String },
})

export const storageSchema = new mongoose.Schema({
    ram: { type: Number },
    rom: { type: Number },
    memory: { type: String },
    maxRam: { type: Number },
})

export const connectionSchema = new mongoose.Schema({
    G2: { type: String },
    G3: { type: String },
    G4: { type: String },
    numberOfSim: { type: Number },
    typeOfSim: { type: [String] },
    Wifi: { type: String },
    GPS: { type: String },
    USB: { type: String },
    phone: { type: String },
})

export const designAndWeightSchema = new mongoose.Schema({
    design: { type: String },
    material: { type: String },
    size: { type: String },
    wiegh: { type: String },
})

export const pinSchema = new mongoose.Schema({
    storage: { type: Number },
    type: { type: String}
})

export const entertainmentAndAppSchema = new mongoose.Schema({
    film: { type: [String] },
    record: { type: Boolean },
    FM: { type: Boolean },
    other: { type: [String] }
})

export const productSchema = new mongoose.Schema({
    title: { type: String, required: true,},
    description: { type: String,},
    urlPicture: { type: String,},
    Vote: { type: Number, default: 5},
    sold: {  type: Number, default: 0},
    quantity: { type: Number, default: 0 },
    colors: { type: [{ color: String, price: Number, urlPicture: String }]},
    createDate: { type: Date, default: Date.now},
    modifyDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    catergory: { type: mongoose.Schema.Types.ObjectId, ref: "Catergory" },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen" },
    behindCamera: { type: mongoose.Schema.Types.ObjectId, ref: "BehindCamera" },
    frontCamera: { type: mongoose.Schema.Types.ObjectId, ref: "FrontCamera" },
    CPU: { type: mongoose.Schema.Types.ObjectId, ref: "CPU" },
    storage: { type: mongoose.Schema.Types.ObjectId, ref: "Storage" },
    connection: { type: mongoose.Schema.Types.ObjectId, ref: "Connection" },
    designAndWeight: { type: mongoose.Schema.Types.ObjectId, ref: "DesignAndWeight" },
    pin: { type: mongoose.Schema.Types.ObjectId, ref: "Pin" },
    entertainmentAndApp: { type: mongoose.Schema.Types.ObjectId, ref: "EntertainmentAndApp" },
})

export const paymentSchema = new mongoose.Schema({
    description: {type: String, require: true }
})

export const shippingSchema = new mongoose.Schema({
    description: { type: String, require: true }
})

export const orderSchema = new mongoose.Schema({
    status: { type: String, require: true },
    orderDate: { type: Date, default: Date.now },
    total: { type: Number, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail'}]
})

export const orderDetailSchema = new mongoose.Schema({
    color: { type: String, require: true },
    quantity: { type: Number, require: true },
    review: { type: Boolean, default: false },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
})

export interface Catergory {
    name: String;
}

export interface Product {
    title:  String;
    description:  String;
    urlPicture:  String;
    Vote:  Number;
    sold: Number; 
    quantity:  Number;
    colors:  [{ color: String, price: Number, urlPicture: String }];
    createDate:  Date;
    modifyDate:  Date;
    status:  Boolean;
    catergory: String;
    screen: String;
    behindCamera: String;
    frontCamera: String;
    CPU: String;
    storage: String;
    connection: String;
    designAndWeight: String;
    pin: String;
    entertainmentAndApp: String;
}

export interface Screen {
    technology: String;
    resolution: String;
    size: String;
    touch: String;
    touchScreen: String;
}
export interface BehindCamera {
    resolution: String;
    video: String;
    flash: Boolean;
    extraCamera: [String];
}
export interface FrontCamera {
    resolution: String;
    video: Boolean;
    extraCamera: [String];
}
export interface CPU {
    cpu: String;
    chipset: String;
    numberOfCore: Number;
    speed: String;
}
export interface Storage {
    ram: Number;
    rom: Number;
    memory: String;
    maxRam: Number;
}
export interface Connection {
    G2: String;
    G3: String;
    G4: String;
    numberOfSim: Number;
    typeOfSim: [String];
    Wifi: String;
    GPS: String;
    USB: String;
    phone: String;
}
export interface DesignAndWeight {
    design: String;
    material: String;
    size: String;
    wiegh: String;
}
export interface Pin {
    storage: Number;
    type: String;
}
export interface EntertainmentAndApp {
    film: [String];
    record: Boolean;
    FM: Boolean;
    other: [String];
}