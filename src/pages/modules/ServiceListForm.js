// src/pages/dashboard/DashboardHome.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import fotter_image from "../../assets/images/image 1.png";
import left from "../../assets/images/staff_sign.png";
import right from "../../assets/images/client_sign.png";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { useParams } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchAssignTaskRequest } from "../../features/assignTask/AssignTaskSlice";
import { createStaffAssignTaskRequest } from "../../features/staffAssignTask/StaffAssignTaskSlice";
import { toast } from "react-toastify";

const StaffAssignedManagement = () => {
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [staffImageURL, setStaffImageURL] = useState(null); // create a state that will contain our image url
  const [clientImageURL, setClientImageURL] = useState(null); // create a state that will contain our image url
  const params = useParams();
  const isRole = useSelector((state) => state?.auth?.userRole);
  const dispatch = useDispatch();
  const sigStaffCanvas = useRef({});
  const sigClientCanvas = useRef({});
  useEffect(() => {
    dispatch(fetchAssignTaskRequest());
  }, [dispatch]);
  const assignTask = useSelector((state) =>
    state?.assignTask?.data?.find((t) => t?._id === params?.id)
  );
  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const staffClear = () => sigStaffCanvas.current.clear();
  const clientClear = () => sigStaffCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const staffSave = useCallback(() => {
    setStaffImageURL(sigStaffCanvas?.current?.toDataURL("image/png"));
    setIsStaffOpen(false);
  }, []);

  const clientSave = () => {
    setClientImageURL(sigClientCanvas?.current?.toDataURL("image/png"));
    setIsClientOpen(false);
  };

  const validationSchema = Yup.object({
    serialNumber: Yup.string().required("*Required"),
    modelNumber: Yup.string().required("*Required"),
    securityTag: Yup.string().required("*Required"),
    switchOffTimer: Yup.string().required("*Required"),
    waterMeterReading: Yup.number().required("*Required"),
    isWaterMeterReading: Yup.boolean().oneOf([true], "*Required"),
    waterDispensing: Yup.number().required("*Required"),
    isWaterDispensing: Yup.boolean().oneOf([true], "*Required"),
    waterTwenty: Yup.number().required("*Required"),
    isWaterTwenty: Yup.boolean().oneOf([true], "*Required"),
    isTotalMeterReadingBefore: Yup.boolean().oneOf([true], "*Required"),
    totalizerMeterReadingBeforeWater: Yup.number().required("*Required"),
    totalizerMeterReadingBeforeVaccum: Yup.number().required("*Required"),
    totalizerMeterReadingBeforeJet: Yup.number().required("*Required"),
    isTotalMeterReadingAfter: Yup.boolean().oneOf([true], "*Required"),
    totalizerMeterReadingAfterWater: Yup.number().required("*Required"),
    totalizerMeterReadingAfterVaccum: Yup.number().required("*Required"),
    totalizerMeterReadingAfterJet: Yup.number().required("*Required"),
  });

  // const [checkboxValues, setCheckboxValues] = useState({
  //   servicing: false,
  //   complaint: false,
  //   installation: false,
  // });
  const isValidDataUrl = (dataUrl) => {
    const regex = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;
    return regex.test(dataUrl);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isWaterDispenser: false,
      isTwoInOne: false,
      isThreeInOne: false,
      isFourInOne: false,
      isFiveInOne: false,
      isCollection: false,
      serialNumber: "" || assignTask?.machineId?.machine_sr_no,
      modelNumber: "" || assignTask?.machineId?.machine_model,
      securityTag: "",
      switchOffTimer: "",
      isCheckTheOperationOfTheWaterDispenser: false,
      isCheckAllOpertionInWorkinigCondition: false,
      isCheckAndDismantle: false,
      isCheckWireForLoose: false,
      isCheckRemoveAndReplacment: false,
      isCleanFilterComapartment: false,
      isCleanMachineSurface: false,
      isWashFilterbag: false,
      isWaterMeterReading: false,
      waterMeterReading: "",
      waterDispensing: "",
      isWaterDispensing: false,
      waterTwenty: "",
      isWaterTwenty: false,
      vacuumDollarOne: "",
      isVacuumDollarOne: false,
      jetDollarOne: "",
      isJetDollarOne: false,
      isTotalMeterReadingBefore: false,
      totalizerMeterReadingBeforeWater: "",
      totalizerMeterReadingBeforeVaccum: "",
      totalizerMeterReadingBeforeJet: "",
      isTotalMeterReadingAfter: false,
      totalizerMeterReadingAfterWater: "",
      totalizerMeterReadingAfterVaccum: "",
      totalizerMeterReadingAfterJet: "",
      requestTextArea: "",
      rectification: "",
      isNewJetMotor: false,
      isJetHose: false,
      isJetNozzle: false,
      isJetMotorRepaired: false,
      isVacuumMotor: false,
      isVacuumHose: false,
      isVacuumNozzle: false,
      isCh928Acceptor: false,
      isBlowerMotor: false,
      isBlowerHose: false,
      isBlowerNozzle: false,
      isMotherboard: false,
      isSolenoidValve: false,
      isSolenoidCoil: false,
      isTotalizer: false,
      isTimer: false,
      isWaterTap: false,
      isNayaxUnit: false,
      isNetsUnit: false,
      isNetsBd: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!isValidDataUrl(staffImageURL)) {
        toast.error("Please sign the staff document first.");
        return;
      }
      if (!isValidDataUrl(clientImageURL)) {
        toast.error("Please sign the client document first.");
        return;
      }
      values = {
        ...values,
        taskId: params?.id,
        staffSign: staffImageURL,
        clientSign: clientImageURL,
      };
      dispatch(createStaffAssignTaskRequest(values));
      resetForm();
    },
  });
  return (
    <>
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 service_form_wrraper">
          <div className="main_container">
            <div className="header_container custom-border-bottom pb-1">
              <div className="container-fluid py-3">
                <div className="row align-items-center">
                  <div className="col-8 text-start">
                    <h1 className="display-6 m-0 fw-medium">
                      Checklist For Servicing and Maintenance of Coin Operated
                      Water Dispensers
                    </h1>
                  </div>
                  <div className="col-4 text-end mt-5">
                    <small className="text-base fw-bold">
                      Ref No: 2024/
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0 d-inline-block w-auto"
                        placeholder="Ref"
                      />
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="body_main_container">
              <form onSubmit={formik.handleSubmit}>
                <div className="body_container">
                  <div className="section_1_container ">
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="col-md-4 col-sm-6">
                        <label
                          htmlFor="due_date"
                          className="form-label m-2 text-base fw-bold"
                        >
                          Date Issued
                        </label>
                        <input
                          className="form-input flex-fill ps-3 m-2"
                          type="date"
                          id="issue_date"
                          name="issueDate"
                          value={
                            assignTask?.createdAt
                              ? new Date(assignTask?.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          disabled={isRole === "Admin" ? false : true}
                        />
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <label
                          htmlFor="due_date"
                          className="form-label m-2 text-base fw-bold"
                        >
                          Complete Date
                        </label>
                        {console.log(isRole)}
                        <input
                          className="form-input flex-fill ps-3 m-2"
                          type="date"
                          id="complete_date"
                          name="completeDate"
                          value={
                            assignTask?.due_date
                              ? new Date(assignTask?.due_date)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          disabled={isRole === "Admin" ? false : true}
                        />
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <label
                          htmlFor="due_date"
                          className="form-label m-2 text-base fw-bold"
                        >
                          Location
                        </label>
                        <input
                          className="form-input flex-fill ps-3 m-2"
                          type="text"
                          id="location"
                          name="location"
                          value={
                            assignTask?.machineId?.location
                              ? assignTask?.machineId?.location
                              : ""
                          }
                          disabled={isRole === "Admin" ? false : true}
                        />
                      </div>
                    </div>
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="col-md-4 col-sm-6">
                        <label
                          htmlFor="due_date"
                          className="form-label m-2 text-base fw-bold"
                        >
                          Telephone No
                        </label>
                        <input
                          id="machine_model1"
                          type="number"
                          name="telehone"
                          className="form-input flex-fill ps-3 m-2"
                          placeholder="Telephone No"
                          aria-label="machine_model1"
                          value={
                            assignTask?.telephone ? assignTask?.telephone : ""
                          }
                          disabled={isRole === "Admin" ? false : true}
                        />
                      </div>
                      <div className="col-md-2 col-sm-3 d-flex align-items-center mt-5">
                        <label htmlFor="servicing" className="form-label m-2">
                          <input
                            type="checkbox"
                            name="servicing"
                            id="servicing"
                            className="me-2"
                            checked={
                              assignTask?.service_type === "Servicing"
                                ? true
                                : false
                            }
                            disabled={isRole === "Admin" ? false : true}
                          />
                          Servicing
                        </label>
                      </div>

                      <div className="col-md-2 col-sm-3 d-flex align-items-center mt-5">
                        <label htmlFor="complaint" className="form-label m-2">
                          <input
                            type="checkbox"
                            name="complaint"
                            id="complaint"
                            className="me-2"
                            checked={
                              assignTask?.service_type === "Complaint"
                                ? true
                                : false
                            }
                            disabled={isRole === "Admin" ? false : true}
                          />
                          Complaint
                        </label>
                      </div>

                      <div className="col-md-2 col-sm-3 d-flex align-items-center mt-5">
                        <label
                          htmlFor="installation"
                          className="form-label m-2"
                        >
                          <input
                            type="checkbox"
                            name="installation"
                            id="installation"
                            className="me-2"
                            checked={
                              assignTask?.service_type === "Installation"
                                ? true
                                : false
                            }
                            disabled={isRole === "Admin" ? false : true}
                          />
                          Installation
                        </label>
                      </div>
                      <div className="col-md-2 col-sm-3 d-flex align-items-center mt-5">
                        <label
                          htmlFor="installation"
                          className="form-label m-2"
                        >
                          <input
                            type="checkbox"
                            name="installation"
                            id="installation"
                            className="me-2"
                          />
                          No fault found
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="section_2_container">
                    <div className="fw-bold p-2">
                      Manufacturer / Supplier of Coin Operated Water Dispenser
                    </div>
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWaterDispenser"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isWaterDispenser"
                              name="isWaterDispenser"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isWaterDispenser}
                            />
                            Water Dispenser
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <select
                            id="serialNumber"
                            name="serialNumber"
                            className="form-input w-full ps-2 m-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.serialNumber}
                          >
                            <option value="" disabled>
                              Serial Number
                            </option>
                            <option value="1">1</option>
                          </select>
                          {formik.touched.serialNumber &&
                            formik.errors.serialNumber && (
                              <div className="red">
                                {formik.errors.serialNumber}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isTwoInOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isTwoInOne"
                              name="isTwoInOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isTwoInOne}
                            />
                            2 in 1
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <select
                            id="modelNumber"
                            name="modelNumber"
                            className="form-input w-full ps-2 m-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.modelNumber}
                          >
                            <option value="" disabled>
                              Model Number
                            </option>
                            <option value="2">2</option>
                          </select>
                          {formik.touched.modelNumber &&
                            formik.errors.modelNumber && (
                              <div className="red">
                                {formik.errors.modelNumber}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isThreeInOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isThreeInOne"
                              name="isThreeInOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isThreeInOne}
                            />
                            3 in 1
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="securityTag"
                            type="text"
                            name="securityTag"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Security Tag"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.securityTag}
                            aria-label="securityTag"
                          />
                          {formik.touched.securityTag &&
                            formik.errors.securityTag && (
                              <div className="red">
                                {formik.errors.securityTag}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isFourInOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isFourInOne"
                              name="isFourInOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isFourInOne}
                            />
                            4 in 1
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="switchOffTimer"
                            type="text"
                            name="switchOffTimer"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Switch Off Timer"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.switchOffTimer}
                            aria-label="switchOffTimer"
                          />
                          {formik.touched.switchOffTimer &&
                            formik.errors.switchOffTimer && (
                              <div className="red">
                                {formik.errors.switchOffTimer}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isFiveInOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isFiveInOne"
                              name="isFiveInOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isFiveInOne}
                            />
                            5 in 1
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center "></div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isCollection"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCollection"
                              name="isCollection"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCollection}
                            />
                            Collection
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center"></div>
                      </div>
                    </div>
                  </div>
                  <div className="section_2_container">
                    <div className="fw-bold p-2">Maintenance Checklist</div>
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="d-flex ">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center mt-3">
                          <label
                            htmlFor="isCheckTheOperationOfTheWaterDispenser"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCheckTheOperationOfTheWaterDispenser"
                              name="isCheckTheOperationOfTheWaterDispenser"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values
                                  .isCheckTheOperationOfTheWaterDispenser
                              }
                            />
                            Check the operation of the Water Dispenser, removing
                            coin acceptor and servicing to ensure pro
                            functioning when necessary.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckAllOpertionInWorkinigCondition"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCheckAllOpertionInWorkinigCondition"
                              name="isCheckAllOpertionInWorkinigCondition"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values
                                  .isCheckAllOpertionInWorkinigCondition
                              }
                            />{" "}
                            Check all operation in working condition.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckAndDismantle"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCheckAndDismantle"
                              name="isCheckAndDismantle"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCheckAndDismantle}
                            />
                            Check and dismantle the solenoid valve and clean
                            thoroughly.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckWireForLoose"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCheckWireForLoose"
                              name="isCheckWireForLoose"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCheckWireForLoose}
                            />
                            Check wire for loose connection.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckRemoveAndReplacment"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCheckRemoveAndReplacment"
                              name="isCheckRemoveAndReplacment"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCheckRemoveAndReplacment}
                            />
                            Check, remove and replacement of defective parts /
                            components when required
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isCleanFilterComapartment"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCleanFilterComapartment"
                              name="isCleanFilterComapartment"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCleanFilterComapartment}
                            />
                            Clean filter compartment.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCleanMachineSurface"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isCleanMachineSurface"
                              name="isCleanMachineSurface"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isCleanMachineSurface}
                            />
                            Clean Machine Surface
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isWashFilterbag"
                              name="isWashFilterbag"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isWashFilterbag}
                            />
                            Wash filter bag.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWaterMeterReading"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isWaterMeterReading"
                              name="isWaterMeterReading"
                              // onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isWaterMeterReading}
                              onChange={(e) => {
                                const checked = e.target.checked;

                                formik.setFieldValue(
                                  "isWaterMeterReading",
                                  checked
                                );

                                // If unchecked, clear waterMeterReading
                                if (!checked) {
                                  formik.setFieldValue("waterMeterReading", "");
                                }
                              }}
                            />
                            Water Meter Reading:
                          </label>
                          {formik.errors.isWaterMeterReading && (
                            <div className="red">
                              {formik.errors.isWaterMeterReading}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="waterMeterReading"
                            type="number"
                            name="waterMeterReading"
                            className="form-input w-full ps-3 m-2"
                            placeholder="XXX . XXX"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.waterMeterReading}
                            aria-label="waterMeterReading"
                            disabled={
                              formik.values.isWaterMeterReading ? false : true
                            }
                          />
                          {formik.touched.waterMeterReading &&
                            formik.errors.waterMeterReading && (
                              <div className="red">
                                {formik.errors.waterMeterReading}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isWaterDispensing"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isWaterDispensing"
                              name="isWaterDispensing"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isWaterDispensing}
                            />
                            Water Dispensing:
                          </label>
                          {formik.errors.isWaterDispensing && (
                            <div className="red">
                              {formik.errors.isWaterDispensing}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <input
                            id="waterDispensing"
                            type="number"
                            name="waterDispensing"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Liter"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.waterDispensing}
                            aria-label="waterDispensing"
                          />
                          {formik.touched.waterDispensing &&
                            formik.errors.waterDispensing && (
                              <div className="red">
                                {formik.errors.waterDispensing}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isWaterTwenty"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isWaterTwenty"
                              name="isWaterTwenty"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isWaterTwenty}
                            />
                            Water:
                          </label>
                          {formik.errors.isWaterTwenty && (
                            <div className="red">
                              {formik.errors.isWaterTwenty}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <input
                            id="waterTwenty"
                            type="number"
                            name="waterTwenty"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Sec"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.waterTwenty}
                            aria-label="waterTwenty"
                          />
                          {formik.touched.waterTwenty &&
                            formik.errors.waterTwenty && (
                              <div className="red">
                                {formik.errors.waterTwenty}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isVacuumDollarOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isVacuumDollarOne"
                              name="isVacuumDollarOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isVacuumDollarOne}
                            />
                            Vacuum / Blower:
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <input
                            id="vacuumDollarOne"
                            type="number"
                            name="vacuumDollarOne"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Min"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.vacuumDollarOne}
                            aria-label="vacuumDollarOne"
                          />
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isJetDollarOne"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isJetDollarOne"
                              name="isJetDollarOne"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isJetDollarOne}
                            />
                            Jet / Foam:
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <input
                            id="jetDollarOne"
                            type="number"
                            name="jetDollarOne"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Min"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.jetDollarOne}
                            aria-label="jetDollarOne"
                          />
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isTotalMeterReadingBefore"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isTotalMeterReadingBefore"
                              name="isTotalMeterReadingBefore"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isTotalMeterReadingBefore}
                            />
                            Totalizer Meter Reading Before:
                          </label>
                          {formik.errors.isTotalMeterReadingBefore && (
                            <div className="red">
                              {formik.errors.isTotalMeterReadingBefore}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="totalizerMeterReadingBeforeWater"
                            type="number"
                            name="totalizerMeterReadingBeforeWater"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Water"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.totalizerMeterReadingBeforeWater
                            }
                            aria-label="totalizerMeterReadingBeforeWater"
                          />
                          {formik.touched.totalizerMeterReadingBeforeWater &&
                            formik.errors.totalizerMeterReadingBeforeWater && (
                              <div className="red">
                                {formik.errors.totalizerMeterReadingBeforeWater}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center "></div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="totalizerMeterReadingBeforeVaccum"
                            type="number"
                            name="totalizerMeterReadingBeforeVaccum"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Vacuum"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.totalizerMeterReadingBeforeVaccum
                            }
                            aria-label="totalizerMeterReadingBeforeWater"
                          />
                          {formik.touched.totalizerMeterReadingBeforeVaccum &&
                            formik.errors.totalizerMeterReadingBeforeVaccum && (
                              <div className="red">
                                {
                                  formik.errors
                                    .totalizerMeterReadingBeforeVaccum
                                }
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center "></div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="totalizerMeterReadingBeforeJet"
                            type="number"
                            name="totalizerMeterReadingBeforeJet"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Jet"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalizerMeterReadingBeforeJet}
                            aria-label="totalizerMeterReadingBeforeJet"
                          />
                          {formik.touched.totalizerMeterReadingBeforeJet &&
                            formik.errors.totalizerMeterReadingBeforeJet && (
                              <div className="red">
                                {formik.errors.totalizerMeterReadingBeforeJet}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isTotalMeterReadingAfter"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isTotalMeterReadingAfter"
                              name="isTotalMeterReadingAfter"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isTotalMeterReadingAfter}
                            />
                            Totalizer Meter Reading After:
                          </label>
                          {formik.errors.isTotalMeterReadingAfter && (
                            <div className="red">
                              {formik.errors.isTotalMeterReadingAfter}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <input
                            id="totalizerMeterReadingAfterWater"
                            type="number"
                            name="totalizerMeterReadingAfterWater"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Water"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.totalizerMeterReadingAfterWater
                            }
                            aria-label="totalizerMeterReadingAfterWater"
                          />
                          {formik.touched.totalizerMeterReadingAfterWater &&
                            formik.errors.totalizerMeterReadingAfterWater && (
                              <div className="red">
                                {formik.errors.totalizerMeterReadingAfterWater}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center "></div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="totalizerMeterReadingAfterVaccum"
                            type="number"
                            name="totalizerMeterReadingAfterVaccum"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Vacuum"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.totalizerMeterReadingAfterVaccum
                            }
                            aria-label="totalizerMeterReadingAfterVaccum"
                          />
                          {formik.touched.totalizerMeterReadingAfterVaccum &&
                            formik.errors.totalizerMeterReadingAfterVaccum && (
                              <div className="red">
                                {formik.errors.totalizerMeterReadingAfterVaccum}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center "></div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="totalizerMeterReadingAfterJet"
                            type="number"
                            name="totalizerMeterReadingAfterJet"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Jet"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalizerMeterReadingAfterJet}
                            aria-label="totalizerMeterReadingAfterJet"
                          />
                          {formik.touched.totalizerMeterReadingAfterJet &&
                            formik.errors.totalizerMeterReadingAfterJet && (
                              <div className="red">
                                {formik.errors.totalizerMeterReadingAfterJet}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section_3_container pe-3">
                    <div className="fw-bold p-2">Request</div>
                    <div>
                      <textarea
                        id="requestTextArea"
                        type="number"
                        name="requestTextArea"
                        className="form-input w-full ps-3 m-2"
                        placeholder="Type Here"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.requestTextArea}
                        aria-label="requestTextArea"
                      />
                    </div>
                  </div>
                  <div className="section_3_container pe-3">
                    <div className="fw-bold p-2">Rectification</div>
                    <div>
                      <textarea
                        id="rectification"
                        type="number"
                        name="rectification"
                        className="form-input w-full ps-3 m-2"
                        placeholder="Type Here"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rectification}
                        aria-label="rectification"
                      />
                    </div>
                  </div>
                  <div className="section_4_container">
                    <div className="fw-bold p-2">Replaced</div>
                    <div className="row p-2">
                      {[
                        { id: "isNewJetMotor", label: "New Jet Motor" },
                        { id: "isJetHose", label: "Jet Hose" },
                        { id: "isJetNozzle", label: "Jet Nozzle" },
                        {
                          id: "isJetMotorRepaired",
                          label: "Jet Motor (Repaired)",
                        },
                        { id: "isVacuumMotor", label: "Vacuum Motor" },
                        { id: "isVacuumHose", label: "Vacuum Hose" },
                        { id: "isVacuumNozzle", label: "Vacuum Nozzle" },
                        { id: "isCh928Acceptor", label: "CH-928 Acceptor" },
                        { id: "isBlowerMotor", label: "Blower Motor" },
                        { id: "isBlowerHose", label: "Blower Hose" },
                        { id: "isBlowerNozzle", label: "Blower Nozzle" },
                        { id: "isMotherboard", label: "Motherboard" },
                        { id: "isSolenoidValve", label: "Solenoid Valve" },
                        { id: "isSolenoidCoil", label: "Solenoid Coil" },
                        { id: "isTotalizer", label: "Totalizer" },
                        { id: "isTimer", label: "Timer" },
                        { id: "isWaterTap", label: "Water Tap" },
                        { id: "isNayaxUnit", label: "Nayax Unit" },
                        { id: "isNetsUnit", label: "Nets Unit" },
                        { id: "isNetsBd", label: "Nets BD" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="col-md-3 col-sm-6 col-12 mb-2"
                        >
                          <div className="form-check d-flex align-items-center">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              id={item.id}
                              name={item.id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values[item.id]}
                            />
                            <label
                              className="form-check-label text-nowrap"
                              htmlFor={item.id}
                            >
                              {item.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section_6_container px-2 mt-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      {/* Left Signature Block */}
                      <div className="text-center">
                        {staffImageURL && <div>Staff Signature</div>}
                        {/* Trigger Image */}
                        <img
                          src={staffImageURL || left}
                          alt="left"
                          className="img-fluid border"
                          style={{
                            maxWidth: `${staffImageURL ? "300px" : "100%"}`,
                            cursor: "pointer",
                          }}
                          onClick={() => setIsStaffOpen(true)}
                        />

                        {/* Optional Save Button when signature already exists */}
                        {staffImageURL && (
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => setIsStaffOpen(true)}
                          >
                            Save Again
                          </button>
                        )}

                        {/* Popup for Signature Pad */}
                        <Popup
                          modal
                          open={isStaffOpen}
                          onClose={() => setIsStaffOpen(false)}
                          closeOnDocumentClick={false}
                        >
                          {(staffclose) => (
                            <>
                              <SignaturePad
                                ref={sigStaffCanvas}
                                canvasProps={{ className: "signatureCanvas" }}
                              />
                              <div className="d-flex justify-content-center gap-2 mt-2">
                                <button
                                  className="btn btn-primary"
                                  onClick={staffSave}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={staffClear}
                                >
                                  Clear
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={staffclose}
                                >
                                  Close
                                </button>
                              </div>
                            </>
                          )}
                        </Popup>
                      </div>

                      {/* Right Static Signature Image */}
                      <div className="text-center">
                        {clientImageURL && <div>Client Signature</div>}
                        {/* Trigger Image */}
                        <img
                          src={clientImageURL || right}
                          alt="left"
                          className="img-fluid border"
                          style={{
                            maxWidth: `${clientImageURL ? "300px" : "100%"}`,
                            cursor: "pointer",
                          }}
                          onClick={() => setIsClientOpen(true)}
                        />

                        {/* Optional Save Button when signature already exists */}
                        {clientImageURL && (
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => setIsClientOpen(true)}
                          >
                            Save Again
                          </button>
                        )}

                        {/* Popup for Signature Pad */}
                        <Popup
                          modal
                          open={isClientOpen}
                          onClose={() => setIsClientOpen(false)}
                          closeOnDocumentClick={false}
                        >
                          {(clientclose) => (
                            <>
                              <SignaturePad
                                ref={sigClientCanvas}
                                canvasProps={{ className: "signatureCanvas" }}
                              />
                              <div className="d-flex justify-content-center gap-2 mt-2">
                                <button
                                  className="btn btn-primary"
                                  onClick={clientSave}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={clientClear}
                                >
                                  Clear
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={clientclose}
                                >
                                  Close
                                </button>
                              </div>
                            </>
                          )}
                        </Popup>
                      </div>
                      {/* <img
                        src={right}
                        alt="right"
                        className="img-fluid"
                        style={{ maxWidth: "48%" }}
                      /> */}
                    </div>
                  </div>

                  <div className="section_6_container">
                    <div className="d-flex justify-content-between mt-3 px-2">
                      <button
                        aria-label="left"
                        type="submit"
                        className="btn-custom-blue rounded-lg px-4 py-3 fs-5 w-25 "
                      >
                        UPLOAD
                      </button>

                      <button
                        aria-label="right"
                        className="btn-custom-blue rounded-lg px-4 py-3 fs-5 w-25 "
                      >
                        FINAL SUBMISSION
                      </button>
                    </div>
                  </div>
                  <div className="section_6_container">
                    <div class="container text-center">
                      <h5 class="fw-bold mb-1">
                        QUALITY ENVIRONMENTAL ENGINEERING PTE LTD
                      </h5>
                      <p class="mb-1">
                        21 Bukit Batok Crescent #17-84 WCEGA Tower Singapore
                        658065
                      </p>
                      <p class="mb-1">
                        Tel: 6465 0776 &nbsp; | &nbsp; Email: admin@qe.com.sg
                      </p>
                      <p class="mb-3">
                        <a href="https://www.qe.com.sg/">
                          https://www.qe.com.sg/
                        </a>
                      </p>

                      <div class="row justify-content-center align-items-center">
                        <div class="col-auto">
                          <img
                            src={fotter_image}
                            alt="bizSAFE STAR"
                            class="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffAssignedManagement;
