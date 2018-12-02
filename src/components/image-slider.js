import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, itemsCurrentPage } from '../actions/items';
class ImageSlider extends Component {
    componentDidMount() {
        this.props.fetchData('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo'); 
    }
    prevClick(page){
        this.props.prevClick(page);
    }
    nextClick(page){
        this.props.nextClick( page);
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var btn2disabled = false;
        var btn1disabled = true;
        
        return (
            <div className="Carousel" >
                <div className="Carousel__images">
                    {
                        this.props.items.map((item,index) => {
                            let res = null;
                            let page = parseInt(this.props.page/5);
                            if( index >= page&& index<page + 5){
                                if(page === 19){//max items cached - max page size
                                    btn2disabled = true;
                                }
                                else{
                                    btn2disabled = false;
                                }
                                if(page === 0){
                                    btn1disabled = true;
                                }
                                else{
                                    btn1disabled = false;
                                }
                                res = (
                                    <div key={item.id} className="Carousel__image--container" >
                                        <div className="Carousel__image--div">
                                            <img  className="Carousel__image--img" src={item.imageURL} alt={item.tags}/>
                                        </div>
                                        <div className="Carousel__text">
                                            Image { index +1 }
                                        </div>
                                    </div>
                                )
                            }
                            
                            return res;
                        })
                    } 
                    <div className="Carousel__arrow" >
                        <svg className="Carousel__arrow--left" onClick={!btn1disabled ? this.prevClick.bind(this,this.props.page):()=>{}}>       
                            <image href="../svg/arrow.svg"  />    
                        </svg>
                        <svg className="Carousel__arrow--right" onClick={!btn2disabled ? this.nextClick.bind(this,this.props.page):()=>{}}>       
                            <image href="../svg/arrow.svg"  />    
                        </svg>
                    </div>

                </div>
               
                <div className="Carousel__buttons">
                    <button type="button" className="Carousel__buttons--btn1" disabled={btn1disabled}
                        onClick={this.prevClick.bind(this,this.props.page)}>Prev</button>
                    <button type="button" className="Carousel__buttons--btn2" disabled={btn2disabled}
                        onClick={this.nextClick.bind(this,this.props.page)}>Next</button>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        page: state.currentPage
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        prevClick : (page) => {
            if(page>0){
                dispatch(itemsCurrentPage(page-5));
            } else {
                dispatch(itemsCurrentPage(0));
            }
        },
        nextClick : (page) => dispatch(itemsCurrentPage(page+5))
        }
    };
export default connect(mapStateToProps, mapDispatchToProps)(ImageSlider);