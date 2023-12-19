import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { branchServ } from '../../services/branchServ';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSearch from '../../components/Icon/IconSearch';
import { useFormik } from 'formik';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import * as Yup from 'yup';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { foodServ } from '../../services/foodServ';
import { managerOrderServ } from '../../services/managerOrderServ';
import moment from 'moment';
import Select from 'react-select';
type Props = {};

const ManagerOrder = (props: Props) => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const optionBranch: Array<{ value: number; label: string }> = [];
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        name: '',
        giaTien: '',
        moTa: '',
      },
      onSubmit: async (values) => {
        // const formData = new FormData();
        // for (let key in values) {
        //   let value = values[key as keyof FormType];
        //   formData.append(key, value);
        // }
        // // tạo form data gửi hình
        // // error when set form data is empty
        // formData.append('img', images[0].file);
        // foodServ.addFoodServ(formData).then((res) => {
        //   foodServ.getAllFood();
        // });
        // await branchServ.uploadImageBranch(formData, res.data.response.id);
        // await branchServ.getAllBranch();
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required('Vui lòng không bỏ trống'),
        giaTien: Yup.string().required('Vui lòng không bỏ trống'),
        moTa: Yup.string().required('Vui lòng không bỏ trống'),
      }),
    });
  useEffect(() => {
    dispatch(setPageTitle('Manage Order'));
    managerOrderServ
      .getAllManagerOrder()
      .then((res) => {
        setFilteredItems(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBranch();
  }, []);

  const getAllBranch = () => {
    branchServ.getAllBranch().then((res) => {
      res.data.response.map((branch: any) => {
        optionBranch.push({
          value: branch.id,
          label: branch.name,
        });
      });
    });
  };

  const editOrder = (user: any = null) => {
    setAddContactModal(true);
  };
  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse mb-3">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dash board
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Danh sách nhà hàng</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách chi nhánh</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editOrder()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm lịch đặt bàn
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Contacts"
              className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 panel p-0 border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Chi nhánh</th>
                <th>Tên khách</th>
                <th>Số điện thoại</th>
                <th>Giờ dự kiến</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Yêu cầu</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems?.map((order: any) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{order.id}</div>
                      </div>
                    </td>
                    <td>{order.branch.name}</td>
                    <td className="whitespace-nowrap">{order.user.name}</td>
                    <td className="whitespace-nowrap">
                      {order.user.phoneNumber}
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-danger">
                        {moment(order.setDate).format('DD/MM')} -
                        {moment(order.setDate).format('HH:mm')}
                        {/* {moment().format()} : {moment().format()} */}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">{order.amount}</td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-primary">
                        {order.tracking.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">{order.requestUser}</td>

                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editOrder()}
                        >
                          Edit
                        </button>
                        {/* <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          // onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Transition appear show={addContactModal} as={Fragment}>
        <Dialog
          as="div"
          open={addContactModal}
          onClose={() => setAddContactModal(false)}
          className="relative z-[51]"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                  <button
                    type="button"
                    onClick={() => setAddContactModal(false)}
                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                  >
                    <IconX />
                  </button>
                  <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Add Contact
                  </div>
                  <div className="p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <label htmlFor="name">Tên khách hàng</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Nhập tên khách hàng"
                          name="name"
                          className={`form-input ${
                            errors.name && touched.name ? 'has-error' : ''
                          }`}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="role">Chức vụ</label>
                        <Select
                          name="role"
                          id="role"
                          defaultValue={optionBranch[0]}
                          options={optionBranch}
                          isSearchable={false}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="moTa">Mô tả</label>
                        <input
                          id="moTa"
                          type="text"
                          name="moTa"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
                          value={values.moTa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.moTa && touched.moTa ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.moTa}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <div
                          className="custom-file-container"
                          data-upload-id="myFirstImage"
                        >
                          <div className="label-container">
                            <button
                              type="button"
                              className="custom-file-container__image-clear"
                              title="Clear Image"
                              onClick={() => {
                                setImages([]);
                              }}
                            >
                              ×
                            </button>
                          </div>
                          <label className="custom-file-container__custom-file"></label>
                          <input
                            type="file"
                            className="custom-file-container__custom-file__custom-file-input"
                            accept="image/*"
                          />
                          <input
                            type="hidden"
                            name="MAX_FILE_SIZE"
                            value="10485760"
                          />
                          <ImageUploading
                            value={images}
                            onChange={onChangeImage}
                            maxNumber={maxNumber}
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              <div className="upload__image-wrapper">
                                <button
                                  className="custom-file-container__custom-file__custom-file-control"
                                  onClick={onImageUpload}
                                >
                                  Choose File...
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                  <div
                                    key={index}
                                    className="custom-file-container__image-preview relative"
                                  >
                                    <img
                                      src={image.dataURL}
                                      alt="img"
                                      className="m-auto"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </ImageUploading>
                        </div>
                      </div>

                      <div className="flex justify-end items-center mt-8">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => setAddContactModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary ltr:ml-4 rtl:mr-4"
                          // onClick={editOrder}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManagerOrder;
