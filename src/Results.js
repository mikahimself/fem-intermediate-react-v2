import React from 'react';
import Pet from './Pet';

const Results = (pets) => {
    const { pets: myPets } = pets;
    return (
        <div className="search">
            {myPets.length === 0 ? <h1>No pets found</h1> : (
                myPets.animals.map(pet => {
                    return (
                    <Pet
                        name={pet.name}
                        animal={pet.type}
                        breed={pet.breeds.primary}
                        key={pet.id}
                        media={pet.photos}
                        location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
                        id={pet.id}
                    />)
                })
            ) }
        </div>
    )
}

export default Results;