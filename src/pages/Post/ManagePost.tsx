import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSearch from '../../components/Icon/IconSearch';
import { useFormik } from 'formik';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import Select from 'react-select';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { postServ } from '../../services/postServ';
import { userServ } from '../../services/userServ';

type Props = {};

interface FormType {
  id: null | number;
  title: string;
  data: string;
  userId: string;
}

const ManagePost = (props: Props) => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [listUser, setListUser] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [contactList, setContactList] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const [optionUser, setOptionUser] = useState<any>({});
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      id: null,
      title: '',
      data: '',
      userId: '',
    },
    onSubmit: async (values: FormType, { resetForm }) => {
      try {
        const formData = new FormData();

        for (let key in values) {
          if (key !== 'id') {
            let value = values[key as keyof Omit<FormType, 'id'>] as string;
            formData.append(key, value);
          }
        }
        // tạo form data gửi hình
        // error when set form data is empty
        if (!images[0].dataURL.includes('cloudinary')) {
          formData.append('img', images[0].file);
        }
        if (values.id) {
          await postServ.updatePostServ(values.id as number, formData);
        } else {
          await postServ.createPost(formData);
        }
        await getAllPost();
        Swal.fire({
          icon: 'success',
          title: values.id
            ? 'Cập nhật tin tức thành công'
            : 'Thêm tin tức thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        setAddContactModal(false);
        resetForm();
        setImages([]);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Vui lòng nhập tiêu đề'),
      data: Yup.string().required('Vui lòng nhập nội dung'),
      userId: Yup.string().required('Vui lòng nhập người đăng'),
    }),
  });
  useEffect(() => {
    dispatch(setPageTitle('Manage Branch'));
    getAllPost();
    getAllUser();
  }, []);

  useEffect(() => {
    setFilteredItems(() => {
      return contactList?.filter((item: any) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList]);

  const getAllPost = async () => {
    postServ
      .getAllPost()
      .then((res) => {
        console.log(res);
        setContactList(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      });
  };

  const getAllUser = async () => {
    userServ
      .getAllUser()
      .then((res) => {
        console.log(res);
        const optionUser = res.data.response.map(
          (user: { name: string; id: number }) => {
            return {
              label: user.name,
              value: user.id,
            };
          }
        );
        setListUser(optionUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (id: number) => {
    postServ
      .deletePost(id)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Xoá tin tức thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        getAllPost();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      });
  };

  const editPost = (post: any = null) => {
    if (post) {
      setValues({
        id: post.id,
        title: post.title,
        data: post.data,
        userId: post.user.id,
      });
      const optionUser = listUser.find(
        (user: any) => user.value === post.user.id
      );
      setOptionUser(optionUser);
      // change img to data url
      const img = new Image();
      img.src = post.img;
      setImages([
        {
          dataURL: img.src,
          file: new File([img.src], 'image.png', { type: 'image/png' }),
        },
      ]);
    } else {
      resetForm();
      setImages([]);
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
          <span>Danh sách tin tức</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách tin tức</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editPost()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm tin tức
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
                <th>Tên tiêu đề</th>
                <th>Hình ảnh</th>
                <th>Nội dung</th>
                <th>Người tạo</th>
                <th>Ngày tạo</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((post: any) => {
                console.log(post);
                return (
                  <tr key={post.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{post.id}</div>
                      </div>
                    </td>
                    <td>{post.title}</td>
                    <td className="whitespace-nowrap">
                      <img src={post.img} width={50} alt="" />
                    </td>
                    <td className="whitespace-nowrap">
                      <p className="w-96 truncate">{post.data}</p>
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-success">
                        {post.user.name}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-info">
                        {moment(post.createdAt).format('DD-MM-YYYY')}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editPost(post)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deletePost(post.id)}
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
                    Thêm voucher
                  </div>
                  <div className="p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <label htmlFor="title">Tiêu đề bài viết</label>
                        <input
                          id="title"
                          type="text"
                          placeholder="Nhập tiêu đề bài viết"
                          name="title"
                          className={`form-input ${
                            errors.title && touched.title ? 'has-error' : ''
                          }`}
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.title}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="userId">Người tạo</label>
                        <Select
                          name="userId"
                          options={listUser}
                          isSearchable={false}
                          onChange={(option: any) => {
                            setFieldValue('userId', option?.value);
                          }}
                          value={optionUser}
                        />
                        {errors.userId && touched.userId ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.userId}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="data">Nội dung bài viết</label>
                        <input
                          id="data"
                          type="text"
                          placeholder="Số lượng mô tả"
                          name="data"
                          className={`form-input ${
                            errors.data && touched.data ? 'has-error' : ''
                          }`}
                          value={values.data}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.data && touched.data ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.data}
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
                          onClick={() => setAddContactModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary ltr:ml-4 rtl:mr-4"
                          // onClick={saveUser}
                        >
                          {values.id ? 'Cập nhật' : 'Thêm'}
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

export default ManagePost;
