export class CreateProductDTO {
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
    screen: {
        technology: String;
        resolution: String;
        size: String;
        touch: String;
        touchScreen: String;
    }
    behindCamera: {
        resolution: String;
        video: String;
        flash: Boolean;
        extraCamera: [String];
    }
    frontCamera: {
        resolution: String;
        video: Boolean;
        extraCamera: [String];
    }
    CPU: {
        cpu: String;
        chipset: String;
        numberOfCore: Number;
        speed: String;
    }
    storage: {
        ram: Number;
        rom: Number;
        memory: String;
        maxRam: Number;
    }
    connection: {
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
    designAndWeight: {
        design: String;
        material: String;
        size: String;
        wiegh: String;
    }
    pin: {
        storage: Number;
        type: String;
    }
    entertainmentAndApp: {
        film: [String];
        record: Boolean;
        FM: Boolean;
        other: [String];
    }
}

export class CreateCatergoryDTO {
    name: String;
}