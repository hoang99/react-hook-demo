import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    posts: PropTypes.array,
};
PostList.defaultProps = {
    posts: [],
}
function PostList(props) {
    const { posts } = props
    console.log(posts);
    return (
        <div className="container-fluid" >
            <div class="row">
                <div className="col-9">
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr className="tr__canGiua">
                                <th>STT</th>
                                <th>Tên bài báo</th>
                                <th>Nội dung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((value, key) => (
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>{value.title}</td>
                                        <td>{value.desc}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                <div className="col-3">
                    <form >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tên bài báo</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Nội dung</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </form>

                </div>
            </div>


        </div>
    );
}

export default PostList;