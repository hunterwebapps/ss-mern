import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

class Accordion extends React.Component {
    constructor() {
        super();
        this.state = {
            activeIndex: -1
        };
    }

    setActive = index => e =>
        this.setState(
            (state, props) => ({
                activeIndex: state.activeIndex === index ? -1 : index
            })
        );

    bodies = [];

    transition = (condition, content) => {
        const child =
            <CSSTransition
                in={condition}
                timeout={2000}
                classNames={'slide'}
                unmountOnExit
            >
                {React.cloneElement(content, {
                    ref: ref => this.transitionContent[content.key] = ref
                })}
            </CSSTransition>;

        console.log(condition, child, this.transitionContent);
        if (condition === true) {
            console.log('content.key', content.key, content);
            const index = this.transitionContent.indexOf(content.key);
            console.log('transition index', this.transitionContent, this.transitionContent[index], index, content.key);
            if (this.transitionContent[index]) {
                console.log('transitionContent[index]', this.transitionContent[index]);
                this.transitionContent[index].maxHeight = this.transitionContent[index].height;
            }
        }

        return child;
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) => {
            if (child.type !== Accordion.Item) {
                throw Error('Accordion Direct Children Must be an Accordion.Item');
            }

            const itemChildren = React.Children.map(child.props.children, itemChild => {
                if (itemChild.type === Accordion.Header) {
                    return React.cloneElement(itemChild, {
                        click: this.setActive(index)
                    });
                } else if (itemChild.type === Accordion.Body) {
                    return React.cloneElement(itemChild, {
                        condition: this.state.activeIndex === index
                    });
                } else {
                    throw Error('Accordion.Item Children Must be of Type Accordion.Header And/Or Accordion.Body');
                }
            });

            return React.cloneElement(child, {}, ...itemChildren);
        });

        return children;
    }

    static Item = ({ children }) => children;

    static Header = ({ children, click }) => <div onClick={click}>{children}</div>;

    static Body = ({ children, condition }) =>
        <CSSTransition
            in={condition}
            timeout={500}
            classNames={'slide'}
            unmountOnExit
        >
            {children}
        </CSSTransition>;
    }
    
    Accordion.displayName = 'Accordion';
    
Accordion.propTypes = {

};

export default Accordion;