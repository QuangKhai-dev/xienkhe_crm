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

type Props = {};

const ManagerBranch = (props: Props) => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        name: '',
        decs: '',
        phoneNumber: '',
        address: '',
      },
      onSubmit: async (values) => {
        const res = await branchServ.addBranchServ(values);
        console.log(res);
        // tạo form data gửi hình
        const formData = new FormData();
        console.log(images[0].file);
        // error when set form data is empty
        formData.append('file', images[0].file);
        await branchServ.uploadImageBranch(formData, res.data.response.id);
        await branchServ.getAllBranch();
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required('Vui lòng không bỏ trống'),
        phoneNumber: Yup.string().required('Vui lòng không bỏ trống'),
        address: Yup.string().required('Vui lòng không bỏ trống'),
        decs: Yup.string().required('Vui lòng không bỏ trống'),
      }),
    });
  useEffect(() => {
    dispatch(setPageTitle('Manage Branch'));
    branchServ
      .getAllBranch()
      .then((res) => {
        console.log(res);
        setFilteredItems(res.data.response);
      })
      .catch((err) => {});
  }, []);

  const deleteBranch = (id: number) => {
    branchServ.deleteBranchServ(id).then((res) => {
      console.log(res);
      branchServ.getAllBranch().then((res) => {
        setFilteredItems(res.data.response);
      });
    });
  };

  const editUser = (user: any = null) => {
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
                onClick={() => editUser()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm nhà hàng
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
                <th>Tên nhà hàng</th>
                <th>Hình ảnh</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((branch: any) => {
                return (
                  <tr key={branch.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{branch.id}</div>
                      </div>
                    </td>
                    <td>{branch.name}</td>
                    <td className="whitespace-nowrap">
                      <img src={branch.imgUrl} width={50} alt="" />
                    </td>
                    <td className="whitespace-nowrap">{branch.phoneNumber}</td>
                    <td className="whitespace-nowrap">{branch.address}</td>
                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          // onClick={() => editUser(contact)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBranch(branch.id)}
                        >
                          Delete
                        </button>
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
                        <label htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Nhập tên nhà hàng"
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
                        <label htmlFor="phoneNumber">PhoneNumber</label>
                        <input
                          id="phoneNumber"
                          type="text"
                          placeholder="Vui lòng nhập số điện thoại"
                          name="phoneNumber"
                          className="form-input"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="number">Address</label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Vui lòng nhập địa chỉ"
                          className="form-input"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.address && touched.address ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.address}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="decs">Mô tả</label>
                        <input
                          id="decs"
                          type="text"
                          name="decs"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
                          value={values.decs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.decs && touched.decs ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.decs}
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
                          // onClick={saveUser}
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

export default ManagerBranch;
