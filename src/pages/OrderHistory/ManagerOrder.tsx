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
import { ImageListType } from 'react-images-uploading';
import { managerOrderServ } from '../../services/managerOrderServ';
import moment from 'moment';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
type Props = {};
let times = [
  {
    value: 1,
    label: '11:00',
  },
  {
    value: 2,
    label: '11:15',
  },
  {
    value: 3,
    label: '11:30',
  },
  {
    value: 4,
    label: '11:45',
  },
  {
    value: 5,
    label: '12:00',
  },
  {
    value: 6,
    label: '12:15',
  },
  {
    value: 7,
    label: '12:30',
  },
  {
    value: 8,
    label: '12:45',
  },
  {
    value: 9,
    label: '13:00',
  },
  {
    value: 10,
    label: '13:15',
  },
  {
    value: 11,
    label: '13:30',
  },
  {
    value: 12,
    label: '13:45',
  },
  {
    value: 14,
    label: '14:00',
  },
  {
    value: 15,
    label: '14:15',
  },
  {
    value: 16,
    label: '14:30',
  },
  {
    value: 17,
    label: '14:45',
  },
  {
    value: 18,
    label: '15:00',
  },
  {
    value: 19,
    label: '15:15',
  },
  {
    value: 20,
    label: '15:30',
  },
  {
    value: 21,
    label: '14:45',
  },
  {
    value: 22,
    label: '15:00',
  },
  {
    value: 23,
    label: '15:15',
  },
  {
    value: 24,
    label: '15:30',
  },
  {
    value: 25,
    label: '15:45',
  },
  {
    value: 26,
    label: '16:00',
  },
  {
    value: 27,
    label: '16:15',
  },
  {
    value: 28,
    label: '16:30',
  },
  {
    value: 29,
    label: '16:45',
  },
  {
    value: 30,
    label: '17:00',
  },
  {
    value: 31,
    label: '17:15',
  },
  {
    value: 32,
    label: '17:30',
  },
  {
    value: 33,
    label: '16:45',
  },
  {
    value: 34,
    label: '17:00',
  },
  {
    value: 35,
    label: '17:15',
  },
  {
    value: 36,
    label: '17:30',
  },
  {
    value: 37,
    label: '17:45',
  },
  {
    value: 38,
    label: '18:00',
  },
  {
    value: 39,
    label: '18:15',
  },
  {
    value: 40,
    label: '18:30',
  },
  {
    value: 41,
    label: '18:45',
  },
  {
    value: 42,
    label: '19:00',
  },
  {
    value: 43,
    label: '19:15',
  },
  {
    value: 44,
    label: '19:30',
  },
  {
    value: 45,
    label: '19:45',
  },
  {
    value: 46,
    label: '20:00',
  },
  {
    value: 47,
    label: '20:15',
  },
  {
    value: 48,
    label: '20:30',
  },
  {
    value: 49,
    label: '20:45',
  },
  {
    value: 50,
    label: '21:00',
  },
  {
    value: 51,
    label: '21:15',
  },
  {
    value: 52,
    label: '21:30',
  },
  {
    value: 53,
    label: '21:45',
  },
  {
    value: 54,
    label: '22:00',
  },
];
const ManagerOrder = (props: Props) => {
  const dispatch = useDispatch();
  const maxNumber = 69;
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [contactList, setContactList] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const [optionBranch, setOptionBranch] = useState<any>([]);
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      amount: '',
      requestUser: '',
      setTime: '',
      setDay: moment().format('YYYY-MM-DD'),
      branchId: 1,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      if (values.id) {
        managerOrderServ
          .updateManagerOrderServ(values)
          .then((res) => {
            managerOrderServ
              .getAllManagerOrder()
              .then((res) => {
                setContactList(res.data.response);
              })
              .catch((err) => {
                console.log(err);
              });
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật đặt bàn thành công',
              padding: '2em',
              customClass: 'sweet-alerts',
            });
            setAddContactModal(false);
            resetForm();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        managerOrderServ
          .addOrderTable(values)
          .then((res) => {
            setAddContactModal(false);
            managerOrderServ
              .getAllManagerOrder()
              .then((res) => {
                setContactList(res.data.response);
              })
              .catch((err) => {
                console.log(err);
              });
            Swal.fire({
              icon: 'success',
              title: 'Thêm đặt bàn thành công',
              padding: '2em',
              customClass: 'sweet-alerts',
            });
            setAddContactModal(false);
            resetForm();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Vui lòng nhập tên khách hàng'),
      email: Yup.string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email'),
      phoneNumber: Yup.string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]+$/, 'Vui lòng nhập số'),
      amount: Yup.string()
        .required('Vui lòng nhập số lượng')
        .matches(/^[0-9]+$/, 'Vui lòng nhập số'),
    }),
  });
  useEffect(() => {
    dispatch(setPageTitle('Manage Order'));
    managerOrderServ
      .getAllManagerOrder()
      .then((res) => {
        setContactList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBranch();
  }, []);

  const getAllBranch = () => {
    branchServ.getAllBranch().then((res) => {
      let data = res.data.response.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setOptionBranch(data);
    });
  };

  useEffect(() => {
    setFilteredItems(() => {
      return contactList.filter((item: any) => {
        return item.user.name?.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList]);

  const editOrder = (order: any = null) => {
    console.log(order);
    if (order) {
      setValues({
        id: order.id,
        name: order.user.name,
        email: order.user.email,
        phoneNumber: order.user.phoneNumber,
        amount: order.amount,
        requestUser: order.requestUser,
        setTime: order.setTime,
        setDay: moment(order.setDate).format('YYYY-MM-DD'),
        branchId: order.branch.id,
      });
    } else {
      setValues({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        amount: '',
        requestUser: '',
        setTime: '',
        setDay: moment().format('YYYY-MM-DD'),
        branchId: 1,
      });
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
          <span>Danh sách Đặt bàn</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách Đặt bàn</h2>
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
                        {moment(order.setDate).format('DD/MM')} -{order.setTime}
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
                          onClick={() => editOrder(order)}
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
                        <label htmlFor="branchId">Chi nhánh</label>
                        <Select
                          name="branchId"
                          id="branchId"
                          defaultValue={optionBranch[0]}
                          options={optionBranch}
                          isSearchable={false}
                          onBlur={handleBlur}
                          onChange={(type) => {
                            console.log(type);
                            setFieldValue('branchId', type?.value);
                          }}
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
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
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                          id="phoneNumber"
                          type="text"
                          name="phoneNumber"
                          placeholder="Vui lòng nhập mô tả"
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
                        <label htmlFor="amount">Số lượng</label>
                        <input
                          id="amount"
                          type="text"
                          name="amount"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
                          value={values.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.amount && touched.amount ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.amount}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="setDay">Chọn ngày</label>
                        <Flatpickr
                          options={{
                            dateFormat: 'Y-m-d',
                            position: 'auto left',
                          }}
                          className="form-input"
                          onChange={(date) => {
                            setFieldValue('setDay', date);
                          }}
                          value={values.setDay}
                        />
                        {errors.setDay && touched.setDay ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.setDay}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="setTime">Chọn giờ</label>
                        <Select
                          name="setTime"
                          id="setTime"
                          // defaultValue={times[0].label}
                          options={times}
                          isSearchable={false}
                          onBlur={handleBlur}
                          // onChange={(selectedOption) => {
                          //   setFieldValue('setTime', selectedOption);
                          // }}
                          // value={values.setTime}
                          onChange={(type) => {
                            console.log(type);
                            setFieldValue('setTime', type!.label);
                          }}
                          value={times.find((time) => {
                            return time.label === values.setTime;
                          })}
                        />
                        {errors.setTime && touched.setTime ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.setTime}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="requestUser">Yêu cầu khách</label>
                        <input
                          id="requestUser"
                          type="text"
                          name="requestUser"
                          placeholder="Vui lòng nhập mô tả"
                          className="form-input"
                          value={values.requestUser}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.requestUser && touched.requestUser ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.requestUser}
                          </div>
                        ) : null}
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

export default ManagerOrder;
