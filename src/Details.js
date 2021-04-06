import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import { navigate } from '@reach/router';
import Modal from './Modal';

class Details extends React.Component {
    // props is data coming from the parent component
    // this.state is local to this component and immutable from outside
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loading: true
    //     }
    // }
    state = { loading: true, showModal: false }

    // Handy for AJAX requests etc.
    componentDidMount() {
        // pick up param from 
        pet.animal(this.props.id)
            .then(( { animal }) => {  // Note that you must use arrow functions, otherwise "this" will be wrong
                // Note that this is a shallow merge - affects only top level
                this.setState({
                    url: animal.url,
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city} - ${animal.contact.address.state}`,
                    media: animal.photos,
                    description: animal.description,
                    breed: animal.breeds.primary,
                    loading: false
                })
            }, console.error)
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal})
    }
    adopt = () => navigate(this.state.url);

    render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>)
        }
        const { animal, breed, location, description, name, media, showModal } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} ${breed} - ${location}`}</h2>

                    {/* Using contexts is somewhat harder with classes.
                        You must use the context within a Consumer, and since the
                        context provides both the theme and setTheme, you must 
                        pick the right item from the array.
                    */}
                    <ThemeContext.Consumer>
                        { (themeHook) => (
                            <button onClick={this.toggleModal} style={{ backgroundColor: themeHook[0]}}>Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No, I am a monster</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

// Details uses the API so there's a chance for error.
// Because of this, let's instead of exporting details, 
// wrap it in a higher order component

// export default Details;
export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}