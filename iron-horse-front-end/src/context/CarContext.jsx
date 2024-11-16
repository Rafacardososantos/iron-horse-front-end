import React, { createContext, useState, useContext } from "react";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        manufactureYear: 2020,
        carInfoDto: {
            insurance: true,
            insuranceName: 'Não possui',
            renavam: '',
            licensePlate: '',
            transmission: '',
            directionType: '',
            chassi: '',
            engineNumber: '',
            cylinderDisplacement: '',
            mileage: '',
            fuelType: '',
            color: "Azul",
            numDoors: 4,
            numSeats: 5,
            headlightBulb: "LED",
            trunkCapacity: 500,
            carFeaturesDto: {
                insulfilm: true,
                tagPike: false,
                antiTheftSecret: true,
                multimedia: false,
                airConditioner: true,
                electricWindowsAndLocks: true,
                triangle: true,
                jack: false,
                wheelWrench: true,
                spareTire: true,
                fireExtinguisher: false,
                alarm: true,
            },
        }
    });

    return (
        <CarContext.Provider value={{ carData, setCarData }}>
            {children}
        </CarContext.Provider>
    );
};

export const useCarContext = () => useContext(CarContext);
