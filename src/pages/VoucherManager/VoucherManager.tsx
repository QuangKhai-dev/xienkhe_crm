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
import { voucherServ } from '../../services/voucherServ';
import moment from 'moment';
import Select from 'react-select';
type Props = {};

const VoucherManager = (props: Props) => {
  const dispatch = useDispatch();
  const [addContactModal, setAddContactModal] = useState<any>(false);
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
  } = useFormik({
    initialValues: {
      amount: '',
      discount: '',
      description: '',
      expired: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await voucherServ.addVoucherServ({
          ...values,
          createdAt: moment(Date.now()).format('YYYY-MM-DD'),
        });
        Swal.fire({
          icon: 'success',
          title: 'Thêm voucher thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        setAddContactModal(false);
        resetForm();
        await getAllVoucher();
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
      amount: Yup.string().required('Vui lòng không bỏ trống'),
      discount: Yup.string().required('Vui lòng không bỏ trống'),
      description: Yup.string().required('Vui lòng không bỏ trống'),
      expired: Yup.string()
        .required('Vui lòng không bỏ trống')
        .test('is-date-in-past', 'Ngày phải là ngày mới', function (value) {
          console.log(value);
          return moment(value, 'YYYY-MM-DD').isAfter(
            moment().format('YYYY-MM-DD')
          );
        }),
    }),
  });
  useEffect(() => {
    dispatch(setPageTitle('Manage Branch'));
    getAllVoucher();
  }, []);

  useEffect(() => {
    setFilteredItems(() => {
      return contactList.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList]);

  const getAllVoucher = async () => {
    voucherServ
      .getAllVoucher()
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

  const deleteVoucher = (id: number) => {
    voucherServ
      .deleteVoucherServ(id)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Xoá voucher thành công',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        getAllVoucher();
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

  const editBranch = (branch: any = null) => {
    setAddContactModal(true);
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
          <span>Danh sách voucher</span>
        </li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Danh sách voucher</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editBranch()}
              >
                <IconMenuCalendar className="ltr:mr-2 rtl:ml-2" />
                Thêm voucher
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
                <th>Tên voucher</th>
                <th>Giảm giá</th>
                <th>Mô tả</th>
                <th>Ngày hiệu lực</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((voucher: any) => {
                return (
                  <tr key={voucher.id}>
                    <td>
                      <div className="flex items-center w-max">
                        <div>{voucher.id}</div>
                      </div>
                    </td>
                    <td>{voucher.name}</td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-secondary">
                        {voucher.discount}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">{voucher.description}</td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-info">
                        {moment(voucher.createdAt).format('DD-MM-YYYY')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline-dark">
                        {moment(voucher.expired).format('DD-MM-YYYY')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">
                      {voucher.isActive ? (
                        <span className="badge bg-success">Có thể sử dụng</span>
                      ) : (
                        <span className="badge bg-danger">Hết hạn</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteVoucher(voucher.id)}
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
                        <label htmlFor="amount">Số lượng</label>
                        <input
                          id="amount"
                          type="text"
                          placeholder="Số lượng voucher"
                          name="amount"
                          className={`form-input ${
                            errors.amount && touched.amount ? 'has-error' : ''
                          }`}
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
                        <label htmlFor="discount">Giảm giá</label>
                        <Select
                          name="discount"
                          options={Array(10)
                            .fill('')
                            .map((_, index) => ({
                              label: `${(index + 1) * 10}%`,
                              value: (index + 1) * 10,
                            }))}
                          isSearchable={false}
                          onChange={(option) => {
                            setFieldValue('discount', option?.value);
                          }}
                        />
                        {errors.discount && touched.discount ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.discount}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="description">Mô tả</label>
                        <input
                          id="description"
                          type="text"
                          placeholder="Số lượng mô tả"
                          name="description"
                          className={`form-input ${
                            errors.description && touched.description
                              ? 'has-error'
                              : ''
                          }`}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.description && touched.description ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="description">Ngày hết hạn</label>
                        <input
                          name="expired"
                          type="date"
                          className="form-input"
                          onChange={(event) => {
                            console.log(event.target.value);
                            // check if the date is old day

                            setFieldValue('expired', event.target.value);
                          }}
                        />
                        {errors.expired && touched.expired ? (
                          <div className="text-danger text-xs mt-1">
                            {errors.expired}
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
                          // onClick={saveUser}
                        >
                          Thêm
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

export default VoucherManager;
