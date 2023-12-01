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
import Swal from 'sweetalert2';
type Props = {};

interface FormType {
  name: string;
  giaTien: string;
  moTa: string;
  id: null | number;
}

const ManagerFood = (props: Props) => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      id: null,
      name: '',
      giaTien: '',
      moTa: '',
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
          await foodServ.updateFoodServ(formData, values.id as number);
        } else {
          await foodServ.addFoodServ(formData);
        }
        await getAllFood();
        Swal.fire({
          icon: 'success',
          title: values.id
            ? 'Cập nhật món ăn thành công'
            : 'Thêm món ăn thành công',
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

      // await branchServ.uploadImageBranch(formData, res.data.response.id);
      // await branchServ.getAllBranch();
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Vui lòng không bỏ trống'),
      giaTien: Yup.number().required('Vui lòng không bỏ trống'),
      moTa: Yup.string().required('Vui lòng không bỏ trống'),
    }),
  });
  useEffect(() => {
    dispatch(setPageTitle('Manage Food'));
    getAllFood();
  }, []);

  const getAllFood = async () => {
    foodServ
      .getAllFood()
      .then((res) => {
        setFilteredItems(res.data.response);
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

  const deleteFood = (id: number) => {
    foodServ
      .deleteFoodServ(id)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Xoá món ăn thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        console.log(res);
        foodServ.getAllFood().then((res) => {
          setFilteredItems(res.data.response);
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Xoá món ăn thất bại',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      });
  };

  const editFood = (food: any = null) => {
    if (food) {
      setValues({
        name: food.name,
        giaTien: food.giaTien,
        moTa: food.moTa,
        id: food.id,
      });
      // change img to data url
      const img = new Image();
      img.src = food.img;
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
          <span>Danh sách món ăn</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách món ăn</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editFood()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm món ăn
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn"
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
                <th>Tên món ăn</th>
                <th>Hình ảnh</th>
                <th>Giá tiền</th>
                <th>Trạng thái</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((food: any) => {
                return (
                  <tr key={food.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{food.id}</div>
                      </div>
                    </td>
                    <td>{food.name}</td>
                    <td className="whitespace-nowrap">
                      <img src={food.img} width={50} alt="" />
                    </td>
                    <td className="whitespace-nowrap">{food.giaTien}</td>
                    <td className="whitespace-nowrap">
                      <div>
                        <label className="w-12 h-6 relative mb-0">
                          <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="custom_switch_checkbox1"
                            checked={food.status}
                          />
                          <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editFood(food)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteFood(food.id)}
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
                        <label htmlFor="name">Tên món ăn</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Nhập tên món ăn"
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
                        <label htmlFor="giaTien">Giá tiền</label>
                        <input
                          id="giaTien"
                          type="text"
                          placeholder="Vui lòng nhập số điện thoại"
                          name="giaTien"
                          className="form-input"
                          value={values.giaTien}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.giaTien && touched.giaTien ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.giaTien}
                          </div>
                        ) : null}
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

export default ManagerFood;
