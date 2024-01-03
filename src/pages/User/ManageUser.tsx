import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import * as Yup from 'yup';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconSearch from '../../components/Icon/IconSearch';
import { useFormik } from 'formik';
import IconX from '../../components/Icon/IconX';
import { userServ } from '../../services/userServ';
import { Link } from 'react-router-dom';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { foodServ } from '../../services/foodServ';
const optionsRole = [
  { value: '', label: 'Chọn chức vụ' },
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
];

interface FormType {
  id: number | null;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

const ManageUser = () => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [contactList, setContactList] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      id: null,
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          if (key !== 'id') {
            formData.append(key, values[key as keyof Omit<FormType, 'id'>]);
          }
        }
        if (!images[0].dataURL.includes('cloudinary')) {
          formData.append('img', images[0].file);
        }
        if (values.id) {
          await userServ.updateUserServ(formData, values.id as number);

          Swal.fire({
            icon: 'success',
            title: 'Cập nhật người dùng thành công',
            padding: '2em',
            customClass: 'sweet-alerts',
          });
        } else {
          await userServ.addUserServ(values);

          Swal.fire({
            icon: 'success',
            title: 'Thêm người dùng thành công',
            padding: '2em',
            customClass: 'sweet-alerts',
          });
        }
        getAllUser();
        setImages([]);
        setAddContactModal(false);
        resetForm();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra vui lòng thử lại',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Vui lòng không bỏ trống'),
      email: Yup.string().required('Vui lòng không bỏ trống'),
      password: Yup.string().required('Vui lòng không bỏ trống'),
      phoneNumber: Yup.string().required('Vui lòng không bỏ trống'),
      role: Yup.string().required('Vui lòng không bỏ trống'),
    }),
  });
  useEffect(() => {
    dispatch(setPageTitle('Manage User'));
    getAllUser();
  }, []);

  useEffect(() => {
    setFilteredItems(() => {
      return contactList.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList]);

  const getAllUser = () => {
    userServ
      .getAllUser()
      .then((res) => {
        setContactList(res.data.response.filter((item: any) => item.isActive));
      })
      .catch((err) => {});
  };

  const deleteUser = (id: number) => {
    userServ
      .deleteUserServ(id)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Xoá người dùng thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        getAllUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editUser = (user: any = null) => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        id: user.id,
      });
      // change img to data url
      const img = new Image();
      img.src = user.img;
      setImages([
        {
          dataURL: img.src,
          file: new File([img.src], 'image.png', { type: 'image/png' }),
        },
      ]);
    } else {
      resetForm();
    }
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
          <span>Danh sách người dùng</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách người dùng</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editUser()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm người dùng
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
                <th>Họ tên</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Chức vụ</th>
                <th className="!text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((user: any) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{user.id}</div>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td className="whitespace-nowrap">
                      <img src={user.img} width={50} alt="" />
                    </td>
                    <td className="whitespace-nowrap">{user.email}</td>
                    <td className="whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-secondary uppercase">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(user.id)}
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
                    onClick={() => {
                      setAddContactModal(false);
                      resetForm();
                    }}
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
                        <label htmlFor="name">Họ tên</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Nhập họ tên"
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
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          placeholder="Vui lòng nhập địa chỉ"
                          className="form-input"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="role">Chức vụ</label>
                        <Select
                          name="role"
                          id="role"
                          defaultValue={optionsRole[0]}
                          options={optionsRole}
                          value={optionsRole.find((item) => {
                            return values.role == item.value;
                          })}
                          isSearchable={false}
                          onBlur={handleBlur}
                          onChange={(type) => {
                            setFieldValue('role', type?.value);
                          }}
                        />
                        {errors.role && touched.role ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.role}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                          id="password"
                          type="text"
                          name="password"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.password}
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
                                  type="button"
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
                          onClick={() => {
                            setAddContactModal(false);
                            resetForm();
                          }}
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

export default ManageUser;
