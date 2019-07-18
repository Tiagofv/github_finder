import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import Repos from './Repos'

const SpecificUser = ({user, loading, getUser, getRepos, repos, match })=> {
    useEffect(() => {
        getUser(match.params.login)
        getRepos(match.params.login)
        // eslint-disable-next-line
    }, []);
  


        const {name, 
            avatar_url,
            location,
            bio,
            blog ,
            login,
            company, 
            html_url, 
            followers, 
            following , 
            public_repos,
            public_gists,
            hireable
        } = user;

        

        if (loading) return <Spinner></Spinner>;
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable: {hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}
                <div className="card grid-2 ">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" alt="" style={{width: '150px'}}/>
                        <h1>
                            {name}
                        </h1>
                        <p>Location: {location}</p>

                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Github Profile</a>
                        <ul>
                            <li>{login && <Fragment>
                                <strong>Username: </strong> {login} 
                            </Fragment>}</li>
                            <li>{company && <Fragment>
                                <strong>Company: </strong> {company} 
                            </Fragment>}</li>
                            <li>{blog && <Fragment>
                                <strong>Website: </strong> {blog} 
                            </Fragment>}</li>
                        </ul>
                    </div>

                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">followers: {followers}</div>
                    <div className="badge badge-success">following: {following}</div>
                    <div className="badge badge-light">Public repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>

                </div>
                <div className="card text-center">
                     <Repos repos={repos}></Repos>           
                </div>
            </Fragment>
        )
}
SpecificUser.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
}
export default SpecificUser
