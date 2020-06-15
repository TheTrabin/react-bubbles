import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';




class AddColor extends React.Component{
    state = {
        newColor: {
            id: Date.now(),
            color: "",
            code: { hex: "" }
            
         },
        isFetching: false
    }

    handleChange = e => {
        this.setState({
            newColor: {
                ...this.state.newFriend,
                [e.target.name]: e.target.value
            }
        });
    };

    addColor = e => {
        e.preventDefault();
        this.setState({
            isFetching: true
        });

        axiosWithAuth()
        .post('/colors', this.state.newColor)
        .then(res => {
            console.log("Post Action: Add new color", res.data);
            this.setState({colors:[...res.data, res.data.payload]});
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    };


    render(){
        return(
            <div>
                <form onSubmit={this.addColor}>
                    <input type="text" name="color" placeholder="Color" value={this.state.newColor.color} onChange={this.handleChange}/>

                    <input type="text" name="code.hex" placeholder="Hex" value={this.state.newColor.code.hex} onChange={this.handleChange}/>

                    <button>Add A new Bubble!</button>
                </form>
            </div>
        )
    }
}
export default AddColor;