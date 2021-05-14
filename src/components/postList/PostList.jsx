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
    const { register: registerEdit, handleSubmit: handleSubmitEdit, watch: watchEdit, formState: { errors1 } } = useForm();

    const onHandleSubmit = (data) => {
        console.log(data);
        props.addDataPostList(data) //xử dụng props bắn data ra ngoài
        // console.log(watch("tenbaibao")) //xem giá trị truyền vào
        // console.log(watch("noidung"))
    }

    const onHandleDelete = (id) => {
        // console.log(id);
        props.deleteDataPostLost(id)

    }
    const [defaultValueEdit, setdefaultValueEdit] = useState('')
    const onHandleGetDataEdit = (value) => {

        props.getDataEdit(value)
        setdefaultValueEdit(value)
        // console.log(defaultValueEdit.desc);
    }

    const onHandleEdit = (dataEdit) => {
        // console.log(dataEdit);
        props.pushDataEdit(dataEdit)
    }


    return (
        <div className="container-fluid" >
            <div className="row">
                <h5>Search</h5>
                <div className="d-flex justify-content-between ml-3"  >

                    <div className="form-group ">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" >
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Search ..." name="searchItem" />
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div className="col-9">
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr className="tr__canGiua">
                                <th>STT</th>
                                <th>Tên bài báo</th>
                                <th>Nội dung</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getDataPostList.map((value, key) => (
                                    <tr >
                                        <td>{value.id}</td>
                                        <td>{value.title}</td>
                                        <td>{value.desc}</td>
                                        <td>
                                            <button className="btn btn-warning" data-toggle="modal" data-target="#btnEdit" onClick={() => onHandleGetDataEdit(value)} >Sửa</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => onHandleDelete(value.id)} >Xóa</button>
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
                {/* handle btn edit */}
                <div>
                    <div className="modal fade" id="btnEdit" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmitEdit(onHandleEdit)}>
                                        <div className="form-group" >
                                            <label htmlFor="exampleInputEmail1">Tên bài báo</label>
                                            <input type="text" className="form-control"  {...registerEdit("tenbaibao")} Value={defaultValueEdit.title} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Nội dung</label>
                                            <input type="text" className="form-control"  {...registerEdit("noidung")} Value={defaultValueEdit.desc} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-warning" >Sửa</button>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* end handle btn edit */}
            </div>
        </div>
    );
}

export default PostList;