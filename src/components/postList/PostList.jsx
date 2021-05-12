import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useState } from 'react';
PostList.propTypes = {
    getDataPostList: PropTypes.array,
};
PostList.defaultProps = {
    getDataPostList: [],
}
function PostList(props) {
    const { getDataPostList } = props
    // console.log(getDataPostList);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onHandleSubmit = (data) => {
        console.log(data);
        props.addDataPostList(data) //xử dụng props bắn data ra ngoài
        // console.log(watch("tenbaibao")) //xem giá trị truyền vào
        // console.log(watch("noidung"))
    }






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
                                <th>
                                    xóa
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getDataPostList.map((value, key) => (
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>{value.title}</td>
                                        <td>{value.desc}</td>
                                        <td>
                                            <button className="btn btn-danger" >Xóa</button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                <div className="col-3">
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className="form-group" >
                            <label htmlFor="exampleInputEmail1">Tên bài báo</label>
                            <input type="text" className="form-control"  {...register("tenbaibao")} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Nội dung</label>
                            <input type="text" className="form-control"  {...register("noidung")} required />
                        </div>

                        <button type="submit" className="btn btn-primary" >Thêm</button>
                    </form>

                </div>
            </div>


        </div>
    );
}

export default PostList;