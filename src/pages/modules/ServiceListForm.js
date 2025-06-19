// src/pages/dashboard/DashboardHome.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import fotter_image from "../../assets/images/image 1.png";
import left from "../../assets/images/staff_sign.png";
import right from "../../assets/images/client_sign.png";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { useParams, useNavigate } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchAssignTaskRequest } from "../../features/assignTask/AssignTaskSlice";
import { fetchStaffAssignTaskRequest } from "../../features/staffAssignTask/StaffAssignTaskSlice";
import {
  createStaffAssignTaskRequest,
  updateStaffAssignedTaskRequest,
  resetStaffAssignTaskSuccess,
} from "../../features/staffAssignTask/StaffAssignTaskSlice";
import { toast } from "react-toastify";

const StaffAssignedManagement = () => {
  const navigate = useNavigate();
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffAssignedTaskValues, setStaffAssignedTaskValues] = useState({});
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [staffImageURL, setStaffImageURL] = useState(null); // create a state that will contain our image url
  const [clientImageURL, setClientImageURL] = useState(null); // create a state that will contain our image url
  const params = useParams();
  const isRole = useSelector((state) => state?.auth?.userRole);
  const pdfSuccess = useSelector((state) => state?.staffAssignTask?.pdfSuccess);
  const dispatch = useDispatch();
  const sigStaffCanvas = useRef({});
  const sigClientCanvas = useRef({});
  useEffect(() => {
    dispatch(fetchAssignTaskRequest());
    dispatch(fetchStaffAssignTaskRequest());
  }, [dispatch]);
  const assignTask = useSelector((state) =>
    state?.assignTask?.data?.find((t) => t?._id === params?.id)
  );
  const staffAssignedTask = useSelector((state) =>
    state?.staffAssignTask?.data?.find((t) => t?.taskId?._id === params?.id)
  );
  useEffect(() => {
    if (pdfSuccess) {
      navigate("/");
      setIsLoading(false);
      dispatch(resetStaffAssignTaskSuccess());
    }
  }, [pdfSuccess]);

  useEffect(() => {
    if (staffAssignedTask) {
      setStaffAssignedTaskValues(staffAssignedTask);
      setClientImageURL(staffAssignedTask?.clientSign);
      setStaffImageURL(staffAssignedTask?.staffSign);
      setIsUpdate(true);
    }
  }, [staffAssignedTask]);
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

  const contentRef = useRef();
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
      isWaterDispenser: staffAssignedTaskValues?.isWaterDispenser || false,
      isTwoInOne: staffAssignedTaskValues?.isTwoInOne || false,
      isThreeInOne: staffAssignedTaskValues?.isThreeInOne || false,
      isFourInOne: staffAssignedTaskValues?.isFourInOne || false,
      isFiveInOne: staffAssignedTaskValues?.isFiveInOne || false,
      isCollection: staffAssignedTaskValues?.isCollection || false,
      serialNumber: "" || assignTask?.machineId?.machine_sr_no,
      modelNumber: "" || assignTask?.machineId?.machine_model,
      securityTag: staffAssignedTaskValues?.securityTag || "",
      switchOffTimer: staffAssignedTaskValues?.switchOffTimer || "",
      isCheckTheOperationOfTheWaterDispenser:
        staffAssignedTaskValues?.isCheckTheOperationOfTheWaterDispenser ||
        false,
      isCheckAllOpertionInWorkinigCondition:
        staffAssignedTaskValues?.isCheckAllOpertionInWorkinigCondition || false,
      isCheckAndDismantle: staffAssignedTaskValues.isCheckAndDismantle || false,
      isCheckWireForLoose: staffAssignedTaskValues.isCheckWireForLoose || false,
      isCleanFilterComapartment:
        staffAssignedTaskValues?.isCleanFilterComapartment || false,
      isCleanMachineSurface:
        staffAssignedTaskValues?.isCleanMachineSurface || false,
      isWashFilterbag: staffAssignedTaskValues?.isWashFilterbag || false,
      isWaterMeterReading:
        staffAssignedTaskValues?.isWaterMeterReading || false,
      waterMeterReading: staffAssignedTaskValues?.waterMeterReading || "",
      waterDispensing: staffAssignedTaskValues?.waterDispensing || "",
      isWaterDispensing: staffAssignedTaskValues?.isWaterDispensing || false,
      waterTwenty: staffAssignedTaskValues?.waterTwenty || "",
      isWaterTwenty: staffAssignedTaskValues?.isWaterTwenty || false,
      vacuumDollarOne: staffAssignedTaskValues?.vacuumDollarOne || "",
      isVacuumDollarOne: false,
      jetDollarOne: staffAssignedTaskValues?.jetDollarOne || "",
      isJetDollarOne: staffAssignedTaskValues?.isJetDollarOne || false,
      isTotalMeterReadingBefore:
        staffAssignedTaskValues?.isTotalMeterReadingBefore || false,
      totalizerMeterReadingBeforeWater:
        staffAssignedTaskValues?.totalizerMeterReadingBeforeWater || "",
      totalizerMeterReadingBeforeVaccum:
        staffAssignedTaskValues?.totalizerMeterReadingBeforeVaccum || "",
      totalizerMeterReadingBeforeJet:
        staffAssignedTaskValues?.totalizerMeterReadingBeforeJet || "",
      isTotalMeterReadingAfter:
        staffAssignedTaskValues?.isTotalMeterReadingAfter || false,
      totalizerMeterReadingAfterWater:
        staffAssignedTaskValues?.totalizerMeterReadingAfterWater || "",
      totalizerMeterReadingAfterVaccum:
        staffAssignedTaskValues?.totalizerMeterReadingAfterVaccum || "",
      totalizerMeterReadingAfterJet:
        staffAssignedTaskValues?.totalizerMeterReadingAfterJet | "",
      requestTextArea: staffAssignedTaskValues?.requestTextArea || "",
      rectification: staffAssignedTaskValues?.rectification || "",
      isNewJetMotor: staffAssignedTaskValues?.isNewJetMotor || false,
      isJetHose: staffAssignedTaskValues?.isJetHose || false,
      isJetNozzle: staffAssignedTaskValues?.isJetNozzle || false,
      isJetMotorRepaired: staffAssignedTaskValues?.isJetMotorRepaired || false,
      isVacuumMotor: staffAssignedTaskValues?.isVacuumMotor || false,
      isVacuumHose: staffAssignedTaskValues?.isVacuumHose || false,
      isVacuumNozzle: staffAssignedTaskValues?.isVacuumNozzle || false,
      isCh928Acceptor: staffAssignedTaskValues?.isCh928Acceptor || false,
      isBlowerMotor: staffAssignedTaskValues?.isBlowerMotor || false,
      isBlowerHose: staffAssignedTaskValues?.isBlowerHose || false,
      isBlowerNozzle: staffAssignedTaskValues?.isBlowerNozzle || false,
      isMotherboard: staffAssignedTaskValues?.isMotherboard || false,
      isSolenoidValve: staffAssignedTaskValues?.isSolenoidValve || false,
      isSolenoidCoil: staffAssignedTaskValues?.isSolenoidCoil || false,
      isTotalizer: staffAssignedTaskValues?.isTotalizer || false,
      isTimer: staffAssignedTaskValues?.isTimer || false,
      isWaterTap: staffAssignedTaskValues?.isWaterTap || false,
      isNayaxUnit: staffAssignedTaskValues?.isNayaxUnit || false,
      isNetsUnit: staffAssignedTaskValues?.isNetsUnit || false,
      isNetsBd: staffAssignedTaskValues?.isNetsBd || false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!isUpdate) {
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
        navigate("/");
        resetForm();
      }
    },
  });
  const finalSubmit = async () => {
    if (isUpdate) {
      let htmlContent = `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>form DATA</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: "inter", sans-serif;
              font-weight: 100;
              font-style: normal;
            }
              input[type=checkbox] {
  accent-color:  #d2d5da;
}
          </style>
        </head>
        <body>
          <div
            class="container"
            style="
              border-bottom: 1px solid #00000033;
              width: 100%;
              height: 180px;
              padding: 20px;
              gap: 20px;
              border-bottom-width: 1px;
            "
          >
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div style="font-weight: 700; font-size: 29px">
                Checklist For Servicing and Maintenance <br />of Coin Operated Water
                Dispensers
              </div>
              <div style="font-weight: 600; font-size: 25px">
                Ref No: 2024/__________________
              </div>
            </div>
          </div>
          <div
            class="container_2"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 176px;
            "
          >
            <div
              style="
                width: 95%;
                height: 100%;
                gap: 20px;
                border-bottom-width: 1px;
                padding-top: 20px;
                padding-left: 10px;
                padding-right: 10px;
                border-bottom: 1px solid #00000033;
              "
            >
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 63px;
                  gap: 15px;
                  justify-content: space-between;
                "
              >
                <div
                  style="
                    display: flex;
                    align-items: start;
                    width: 402px;
                    border-radius: 8px;
                    flex-direction: column;
                    padding-right: 20px;
                    padding-left: 20px;
                    padding-top: 12px;

                    gap: 2px;
                    border-width: 1px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                  <div style="font-size: small; font-weight: 400">Date Issued</div>
                  <div style="font-weight: 500">${
                    assignTask?.createdAt
                      ? new Date(assignTask?.createdAt)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }</div>
                </div>
                <div
                  style="
                     display: flex;
                    align-items: start;
                    width: 402px;
                    height: 63px;
                    border-radius: 8px;
                    flex-direction: column;
                    padding-right: 20px;
                    padding-left: 20px;
                     padding-top: 12px;
                    gap: 2px;
                    border-width: 1px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                  <div style="font-size: small; font-weight: 400">Date Complete</div>
                  <div style="font-weight: 500">${
                    assignTask?.due_date
                      ? new Date(assignTask?.due_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }</div>
                </div>
                <div
                  style="
                    display: flex;
                      display: flex;
                    align-items: start;
                    width: 402px;
                    height: 63px;
                    border-radius: 8px;
                    flex-direction: column;
                    padding-right: 20px;
                    padding-left: 20px;
                     padding-top: 12px;
                    gap: 2px;
                    border-width: 1px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                  <div style="font-size: small; font-weight: 400">Location</div>
                  <div style="font-weight: 500">${
                    assignTask?.machineId?.location || ""
                  }</div>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 63px;
                  gap: 15px;
                  margin-top: 10px;
                  justify-content: space-between;
                "
              >
                <div
                  style="
                   display: flex;
                    align-items: start;
                    width: 402px;
                    height: 63px;
                    border-radius: 8px;
                    flex-direction: column;
                    padding-right: 20px;
                    padding-left: 20px;
                    padding-top: 12px;
                    gap: 2px;
                    border-width: 1px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                  <div style="font-size: small; font-weight: 400">Telephone No</div>
                  <div style="font-weight: 500">${
                    assignTask?.machineId?.recipientPhone || ""
                  }</div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 490px;
                    height: 40px;
                    gap: 10px;
                    padding-top: 20px;
                  "
                >
                  <div style="width: 198px; height: 20px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        assignTask?.service_type === "Servicing"
                          ? "checked"
                          : ""
                      } name="sameadr" />

                      Servicing
                    </label>
                  </div>
                  <div style="width: 198px; height: 20px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                    <input type="checkbox" ${
                      assignTask?.service_type === "Complaint" ? "checked" : ""
                    } name="sameadr" />
                      Complaint
                    </label>
                  </div>
                  <div style="width: 198px; height: 20px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        assignTask?.service_type === "Installation"
                          ? "checked"
                          : ""
                      } name="sameadr" />

                      Installation
                    </label>
                  </div>
                  <div style="width: 198px; height: 20px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        assignTask?.service_type === "No fault found"
                          ? "checked"
                          : ""
                      } name="sameadr" /> No
                      fault found
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="container_3"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 323px;
            "
          >
            <div
              class="row_3"
              style="
                width: 90%;
                gap: 20px;
                border-bottom-width: 1px;
                padding-bottom: 10px;
              "
            >
              <div
                style="
                  height: 29px;
                  font-family: Inter;
                  font-weight: 500;
                  font-size: 22px;
                  line-height: 130%;
                  letter-spacing: -2%;
                "
              >
                Manufacturer / Supplier of Coin Operated Water Dispenser
              </div>
              <div
                class="row_3"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 100%;
                  height: 244px;
                  gap: 30px;
                  padding: 10px;
                "
              >
                <div
                  class="col-3"
                  style="
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                    height: 244px;
                    gap: 15px;
                    padding-top: 10px;
                  "
                >
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" checked ${
                        formik.values.isWaterDispenser ? "checked" : ""
                      } name="isWaterDispenser" /> Water
                      Dispenser
                    </label>
                  </div>
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isTwoInOne ? "checked" : ""
                      } name="sameadr" /> 2 in
                      1
                    </label>
                  </div>
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isThreeInOne ? "checked" : ""
                      } name="sameadr" /> 3 in
                      1
                    </label>
                  </div>
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isFourInOne ? "checked" : ""
                      } name="sameadr" /> 4 in
                      1
                    </label>
                  </div>
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isFiveInOne ? "checked" : ""
                      } name="sameadr" /> 5 in
                      1
                    </label>
                  </div>
                  <div style="width: 530px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isCollection ? "checked" : ""
                      } name="sameadr" />
                      Collection
                    </label>
                  </div>
                </div>
                <div
                  class="col-3"
                  style="
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                    height: 241px;
                    gap: 15px;
                  "
                >
                  <div
                    style="
                      width: 400px;
                      height: 49px;
                      border-radius: 8px;
                      border-width: 1px;
                      padding: 15px;
                      background-color: #f4f4f4;
                      border: 1px solid #cdcdcd;
                    "
                  >
                    <div
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 100%;
                        letter-spacing: -2%;
                        color: #4b5563;
                      "
                    >
                      ${assignTask?.machineId?.machine_sr_no}
                    </div>
                  </div>
                  <div
                    style="
                      width: 400px;
                      height: 49px;
                      border-radius: 8px;
                      border-width: 1px;
                      padding: 15px;
                      background-color: #f4f4f4;
                      border: 1px solid #cdcdcd;
                    "
                  >
                    <div
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 100%;
                        letter-spacing: -2%;
                        color: #4b5563;
                      "
                    >
                    ${assignTask?.machineId?.machine_model}

                    </div>
                  </div>
                  <div
                    style="
                      width: 400px;
                      height: 49px;
                      border-radius: 8px;
                      border-width: 1px;
                      padding: 15px;
                      background-color: #f4f4f4;
                      border: 1px solid #cdcdcd;
                      color: #4b5563;
                    "
                  >
                    <div
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 100%;
                        letter-spacing: -2%;
                        color: #4b5563;
                      "
                    >
                      ${formik.values.securityTag}
                    </div>
                  </div>
                  <div
                    style="
                      width: 400px;
                      height: 49px;
                      border-radius: 8px;
                      border-width: 1px;
                      padding: 15px;
                      background-color: #f4f4f4;
                      border: 1px solid #cdcdcd;
                    "
                  >
                    <div
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 100%;
                        letter-spacing: -2%;
                        color: #4b5563;
                      "
                    >
                      ${formik.values.switchOffTimer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="container_4"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 950px;
              gap: 20px;
              border-bottom-width: 1px;
              padding-bottom: 30px;
            "
          >
            <div
              class="row"
              style="display: flex; flex-direction: column; width: 90%; gap: 20px"
            >
              <div
                style="
                  width: 300px;
                  height: 29px;
                  font-family: Inter;
                  font-weight: 700;
                  font-size: 22px;
                  line-height: 130%;
                  letter-spacing: -2%;
                "
              >
                Maintenance Checklist
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  height: 900px;
                  gap: 15px;
                "
              >
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCheckTheOperationOfTheWaterDispenser
                        ? "checked"
                        : ""
                    } name="sameadr" /> Check
                    the operation of the Water Dispenser, removing coin acceptor and
                    servicing to ensure pro functioning when necessary
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCheckAllOpertionInWorkinigCondition
                        ? "checked"
                        : ""
                    } name="sameadr" /> Check
                    all operation in working condition.
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCheckAndDismantle ? "checked" : ""
                    } name="sameadr" /> Check
                    and dismantle the solenoid valve and clean thoroughly
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCheckWireForLoose ? "checked" : ""
                    } name="sameadr" /> Check
                    wire for loose connection.
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCheckRemoveAndReplacment ? "checked" : ""
                    } name="sameadr" /> Check,
                    remove and replacement of defective parts / components when
                    required
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCleanFilterComapartment ? "checked" : ""
                    } name="sameadr" /> Clean
                    filter compartment.
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isCleanMachineSurface ? "checked" : ""
                    } name="sameadr" /> Clean
                    Machine Surface.
                  </label>
                </div>
                <div style="width: 100%; height: 20px">
                  <label
                    style="
                      font-family: Inter;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      letter-spacing: -2%;
                    "
                  >
                    <input type="checkbox" ${
                      formik.values.isWashFilterbag ? "checked" : ""
                    } name="sameadr" /> Wash
                    filter bag.
                  </label>
                </div>
                <div style="width: 100%; height: 49px">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    "
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isWaterMeterReading ? "checked" : ""
                        } name="sameadr" />
                        Water Meter Reading:
                      </label>
                    </div>

                    <div
                      style="
                        width: 611px;
                        height: 49px;
                        border-radius: 8px;
                        border-width: 1px;
                        padding: 15px;
                        background-color: #f4f4f4;
                        border: 1px solid #cdcdcd;
                        color: #4b5563;
                      "
                    >
                      <div
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: -2%;
                          color: #4b5563;
                        "
                      >
                        ${formik.values.waterMeterReading}
                      </div>
                    </div>
                  </div>
                </div>

                <div style="width: 100%; height: 49px">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    "
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isWaterDispensing ? "checked" : ""
                        } name="sameadr" />
                        Water Dispensing:
                      </label>
                    </div>

                    <div
                      style="
                        width: 611px;
                        height: 49px;
                        border-radius: 8px;
                        border-width: 1px;
                        padding: 15px;
                        background-color: #f4f4f4;
                        border: 1px solid #cdcdcd;
                        color: #4b5563;
                      "
                    >
                      <div
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: -2%;
                          color: #4b5563;
                        "
                      >
                        ${formik.values.waterDispensing}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 100%; height: 49px">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                      padding-top:10px;
                    "
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isWaterTwenty ? "checked" : ""
                        } name="sameadr" />
                        Water
                      </label>
                    </div>

                    <div
                      style="
                        width: 611px;
                        height: 49px;
                        border-radius: 8px;
                        border-width: 1px;
                        padding: 15px;
                        background-color: #f4f4f4;
                        border: 1px solid #cdcdcd;
                        color: #4b5563;
                      "
                    >
                      <div
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: -2%;
                          color: #4b5563;
                        "
                      >
                         ${formik.values.waterTwenty}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 100%; height: 49px">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    "
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isVacuumDollarOne ? "checked" : ""
                        } name="sameadr" />
                        Vacuum / Blower
                      </label>
                    </div>

                    <div
                      style="
                        width: 611px;
                        height: 49px;
                        border-radius: 8px;
                        border-width: 1px;
                        padding: 15px;
                        background-color: #f4f4f4;
                        border: 1px solid #cdcdcd;
                        color: #4b5563;
                      "
                    >
                      <div
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: -2%;
                          color: #4b5563;
                        "
                      >
                        ${formik.values.vacuumDollarOne}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 100%; height: 49px;">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    "
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isJetDollarOne ? "checked" : ""
                        } name="sameadr" /> Jet
                        / Foam
                      </label>
                    </div>

                    <div
                      style="
                        width: 611px;
                        height: 49px;
                        border-radius: 8px;
                        border-width: 1px;
                        padding: 15px;
                        background-color: #f4f4f4;
                        border: 1px solid #cdcdcd;
                        color: #4b5563;
                      "
                    >
                      <div
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: -2%;
                          color: #4b5563;
                        "
                      >
                        ${formik.values.jetDollarOne}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 100%; height: 167px">
                  <div
                    style="display: flex; justify-content: space-between; width: 100%"
                  >
                    <div style="width: 611px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isTotalMeterReadingBefore
                            ? "checked"
                            : ""
                        } name="sameadr" />
                        Totalizer Meter Reading Before
                      </label>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px">
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                          ${formik.values.totalizerMeterReadingBeforeWater}
                        </div>
                      </div>
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                          ${formik.values.totalizerMeterReadingBeforeVaccum}
                        </div>
                      </div>
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                        ${formik.values.totalizerMeterReadingBeforeJet}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="width: 100%; height: 167px">
                  <div
                    style="display: flex; justify-content: space-between; width: 100%"
                  >
                    <div style="width: 300px; height: 24px; gap: 10px">
                      <label
                        style="
                          font-family: Inter;
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 20px;
                          letter-spacing: -2%;
                        "
                      >
                        <input type="checkbox" ${
                          formik.values.isTotalMeterReadingAfter
                            ? "checked"
                            : ""
                        } name="sameadr" />
                        Totalizer Meter Reading after
                      </label>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px">
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                           ${formik.values.totalizerMeterReadingAfterWater}
                        </div>
                      </div>
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                                               ${
                                                 formik.values
                                                   .totalizerMeterReadingAfterVaccum
                                               }

                        </div>
                      </div>
                      <div
                        style="
                          width: 363px;
                          height: 49px;
                          border-radius: 8px;
                          border-width: 1px;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border: 1px solid #cdcdcd;
                          color: #4b5563;
                        "
                      >
                        <div
                          style="
                            font-family: Inter;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            letter-spacing: -2%;
                            color: #4b5563;
                          "
                        >
                                                                   ${
                                                                     formik
                                                                       .values
                                                                       .totalizerMeterReadingAfterJet
                                                                   }

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="container_5"
            style="
              display: flex;
              justify-content: center;
              align-self: center;
              width: 100%;
              height: 169px;
              gap: 20px;
              border-bottom-width: 1px;
              padding-top:10px;
              padding-bottom: 5px;
            "
          >
            <div class="row" style="width: 90%; height: 169px">
              <div style="display: flex; flex-direction: column; gap: 20px">
                <div
                  style="
                    width: 87px;
                    height: 29px;
                    font-family: Inter;
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 130%;
                    letter-spacing: -2%;
                    color: #1e1e1e;
                  "
                >
                  Request
                </div>
                <div
                  style="
                    width: 100%;
                    height: 120px;
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 100%;
                    letter-spacing: -2%;
                    color: #4b5563;
                    padding: 20px;
                    border-radius: 8px;
                    gap: 15px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                                                          ${
                                                            formik.values
                                                              .requestTextArea
                                                          }

                </div>
              </div>
            </div>
          </div>

          <div
            class="container_5"
            style="
              display: flex;
              justify-content: center;
              align-self: center;
              width: 100%;
              height: 169px;
              gap: 20px;
              border-bottom-width: 1px;
              padding-top: 5px;
            "
          >
            <div class="row" style="width: 90%; height: 400px; margin-top: 30px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div
                  style="
                    width: 87px;
                    height: 29px;
                    font-family: Inter;
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 130%;
                    letter-spacing: -2%;
                    color: #1e1e1e;
                  "
                >
                  Rectification
                </div>
                <div
                  style="
                    width: 100%;
                    height: 120px;
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 100%;
                    letter-spacing: -2%;
                    color: #4b5563;
                    border-radius: 8px;
                    padding: 20px;
                    gap: 15px;
                    background-color: #f4f4f4;
                    border: 1px solid #cdcdcd;
                  "
                >
                   ${formik.values.rectification}
                </div>
              </div>
            </div>
          </div>

          <div
            class="container_6"
            style="
              display: flex;
              justify-content: center;
              align-self: center;
              margin-top: 20px;
              width: 100%;
              height: 300px;
              gap: 20px;
              border-bottom-width: 1px;
              padding-top: 20px;
            "
          >
            <div class="row" style="width: 90%; height: 169px">
              <div style="display: flex; flex-direction: column; gap: 20px">
                <div
                  style="
                    width: 87px;
                    height: 29px;
                    font-family: Inter;
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 130%;
                    padding-top: 30px;
                    letter-spacing: -2%;
                    color: #1e1e1e;
                    margin-bottom: 20px;
                  "
                >
                  Replaced
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                    gap: 15px;
                  "
                >
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isNewJetMotor ? "checked" : ""
                      } name="sameadr" /> New
                      Jet Motor
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isJetHose ? "checked" : ""
                      } name="sameadr" /> Jet
                      Hose
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isJetNozzle ? "checked" : ""
                      } name="sameadr" /> Jet
                      Nozzle
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isJetMotorRepaired ? "checked" : ""
                      } name="sameadr" /> Jet
                      Motor (Repaired)
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isVacuumMotor ? "checked" : ""
                      } name="sameadr" />
                      Vacuum Motor
                    </label>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                    gap: 15px;
                  "
                >
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isVacuumHose ? "checked" : ""
                      } name="sameadr" />
                      Vacuum Hose
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isVacuumNozzle ? "checked" : ""
                      } name="sameadr" />
                      Vacuum Nozzle
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isCh928Acceptor ? "checked" : ""
                      } name="sameadr" />
                      CH-928 Acceptor
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isBlowerMotor ? "checked" : ""
                      } name="sameadr" />
                      Blower Motor
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isBlowerHose ? "checked" : ""
                      } name="sameadr" />
                      Blower Hose
                    </label>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                    gap: 15px;
                  "
                >
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isBlowerNozzle ? "checked" : ""
                      } name="sameadr" />
                      Blower Nozzle
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isMotherboard ? "checked" : ""
                      } name="sameadr" />
                      Motherboard
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isSolenoidValve ? "checked" : ""
                      } name="sameadr" />
                      Solenoid Valve
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isSolenoidCoil ? "checked" : ""
                      } name="sameadr" />
                      Solenoid Coil
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isTotalizer ? "checked" : ""
                      } name="sameadr" />
                      Totalizer
                    </label>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                    gap: 15px;
                  "
                >
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isTimer ? "checked" : ""
                      } name="sameadr" /> Timer
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isWaterTap ? "checked" : ""
                      } name="sameadr" /> Water
                      Tap
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isNayaxUnit ? "checked" : ""
                      } name="sameadr" /> Nayax
                      Unit
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox"${
                        formik.values.isNetsUnit ? "checked" : ""
                      } name="sameadr" /> Nets
                      Unit
                    </label>
                  </div>
                  <div style="width: 611px; height: 24px; gap: 10px">
                    <label
                      style="
                        font-family: Inter;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: -2%;
                      "
                    >
                      <input type="checkbox" ${
                        formik.values.isNetsBd ? "checked" : ""
                      } name="sameadr" /> Nets
                      BD
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="container-7"
            style="
              display: flex;
              justify-content: center;
              align-self: center;
              width: 100%;
              height: 120px;
              margin-bottom: 30px;
              gap: 20px;
              border-bottom-width: 1px;
            "
          >
            <div
              class="row"
              style="
                display: flex;
                justify-content: space-between;
                align-items: end;
                width: 90%;
                height: 120px;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: end;
                  width: 350px;
                  height: 110px;
                  gap: 10px;
                  padding-bottom: 10px;
                  border-width: 1px;
                  border: 1px solid #000000;
                "
              >
               <img src="${staffImageURL}" width="350" height="100">
              </div>

              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: end;
                  width: 350px;
                  height: 110px;
                  gap: 10px;
                  padding-bottom: 10px;
                  border-width: 1px;
                  border: 1px solid #000000;
                "
              >
              <img src="${clientImageURL}" width="350" height="100" />
              </div>
            </div>
          </div>

          <div
            class="container-8"
            style="
              display: flex;
              margin-top: 30px;
              padding-top: 30px;
              justify-content: center;
              align-self: center;
              width: 100%;
              height: 314px;
              gap: 20px;
              border-bottom-width: 1px;
              margin-top: 30px;
            "
          >
            <div
              class="row"
              style="
                width: 50%;
                display: flex;
                justify-content: center;
                align-self: center;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 661px;
                  height: 145px;
                  text-align: center;
                  flex-direction: column;
                  gap: 10px;
                "
              >
                <div
                  style="
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 19px;
                    line-height: 29px;
                    letter-spacing: 0%;
                    text-align: center;
                  "
                >
                  QE ELEMECH ENGINEERING PTE LTD 53 Woodlands Industrial <br />
                  Park E2, Singapore 757473
                  <br />https://www.qe.com.sg/
                </div>
                <div
                  style="
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 19px;
                    line-height: 29px;
                    letter-spacing: 0%;
                    text-align: center;
                  "
                >
                  Tel: 64844355 | Fax: 64844354 | Email: qeengrg@singnet.com.sg
                </div>
                <div>
                  <img src="http://157.173.218.220:5001/db/footer_image.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;
      let data = {
        html: htmlContent,
        id: staffAssignedTask?._id,
      };
      dispatch(updateStaffAssignedTaskRequest(data));
    }
  };
  return (
    <>
      <div className="p-5 w-100" ref={contentRef} id="pdf-content">
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
                          value={assignTask?.machineId?.location || ""}
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
                          value={assignTask?.machineId?.recipientPhone || ""}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                            disabled={isUpdate ? true : false}
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
                        disabled={isUpdate ? true : false}
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
                        disabled={isUpdate ? true : false}
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
                              disabled={isUpdate ? true : false}
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
                        {staffImageURL && !isUpdate ? (
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => setIsStaffOpen(true)}
                          >
                            Save Again
                          </button>
                        ) : (
                          ""
                        )}

                        {/* Popup for Signature Pad */}
                        {isUpdate ? (
                          ""
                        ) : (
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
                        )}
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
                        {clientImageURL && !isUpdate ? (
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => setIsClientOpen(true)}
                          >
                            Save Again
                          </button>
                        ) : (
                          ""
                        )}

                        {/* Popup for Signature Pad */}
                        {isUpdate ? (
                          ""
                        ) : (
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
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="section_6_container">
                    <div className="d-flex justify-content-between mt-3 px-2">
                      {isUpdate ? (
                        ""
                      ) : (
                        <button
                          aria-label="left"
                          type="submit"
                          className="btn-custom-blue rounded-lg px-4 py-3 fs-5 w-25 "
                        >
                          UPLOAD
                        </button>
                      )}
                      {staffAssignedTask?.isFinalSubmition || !isUpdate ? (
                        ""
                      ) : (
                        <button
                          aria-label="right"
                          className="btn-custom-blue rounded-lg px-4 py-3 fs-5 w-25 d-flex align-items-center justify-content-center gap-2"
                          onClick={finalSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            "FINAL SUBMISSION"
                          )}
                        </button>
                      )}
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
