import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardMedia, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import { imgStyles, StyledHeart } from './MovieCardStyles';
import {
  addFavorite,
  deleteFavorite,
  getFavorites
} from '../../actions/favorites';
import { getAuthStatus, getUserId } from '../../reducers/auth';

class MovieCard extends Component {
  state = {
    isFavorited: null,
    open: false
  };

  componentWillMount() {
    const isFavorited = this.checkIfIsFavorited();
    this.setState({ isFavorited });
  }

  checkIfIsFavorited = () => {
    const { favorites } = this.props;
    const movie_id = this.props.id;
    return Boolean(favorites[movie_id]);
  };

  handleClick = (props) => {
    const { isAuthenticated } = props;
    isAuthenticated ? this.updateFavorites(props) : this.handleOpen();
  };

  updateFavorites = async (props) => {
    const { deleteFavorite, addFavorite } = props;
    const { isFavorited } = this.state;

    isFavorited ? deleteFavorite(props) : addFavorite(props);
    this.setState({ isFavorited: !this.state.isFavorited });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRedirect = (e) => {
    this.props.history.push('/signin');
  };

  render() {
    const {
      title,
      overview,
      poster_path,
      release_date,
      vote_average
    } = this.props;
    const ROOT_IMG_URL = 'https://image.tmdb.org/t/p/original/';
    const src = `${ROOT_IMG_URL}${poster_path}`;
    const movie_id = this.props.id;
    const subtitle = `Release Date: ${release_date}`;
    const newProps = { ...this.props, movie_id, poster_path: src };

    const actions = [
      <Link to="/signin">
        <FlatButton label="Sign In" primary={true} />
      </Link>,
      <Link to="/signup">
        <FlatButton label="Sign Up" primary={true} keyboardFocused={true} />
      </Link>
    ];

    return (
      <Card>
        <CardMedia>
          <img style={imgStyles} src={src} alt={title} />
        </CardMedia>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          subtitle={subtitle}
        />
        <StyledHeart
          isFavorited={this.state.isFavorited}
          onClick={() => this.handleClick(newProps)}
          size={45}
        />
        <CardText expandable={true}>{overview}</CardText>
        <Dialog
          title="Unauthenticated User"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          You must sign in or sign up before favoriting a movie. Please do so
          below.
        </Dialog>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: getAuthStatus(state),
  user_id: getUserId(state),
  favorites: getFavorites(state)
});

export default connect(mapStateToProps, {
  addFavorite,
  deleteFavorite
})(MovieCard);
