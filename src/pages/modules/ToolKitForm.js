// src/pages/dashboard/DashboardHome.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import fotter_image from "../../assets/images/image 1.png";
import left from "../../assets/images/staff_sign.png";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { useParams, useNavigate } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchToolKitAssignTaskRequest } from "../../features/toolkitTask/ToolkitTaskSlice";
import { createToolKitAssignTaskRequest } from "../../features/toolkitTask/ToolkitTaskSlice";
import { toast } from "react-toastify";

const ToolKitForm = () => {
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAddNotes, setIsAddNotes] = useState(false);
  const [staffImageURL, setStaffImageURL] = useState(null); // create a state that will contain our image url
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sigStaffCanvas = useRef({});
  useEffect(() => {
    dispatch(fetchToolKitAssignTaskRequest());
  }, [dispatch]);
  const toolkitAssignTask = useSelector((state) =>
    state?.toolkitAssignTask?.data?.find((t) => t.taskId === params.id)
  );
  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const staffClear = () => sigStaffCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const staffSave = useCallback(() => {
    setStaffImageURL(sigStaffCanvas?.current?.toDataURL("image/png"));
    setIsStaffOpen(false);
  }, []);

  useEffect(() => {
    if (toolkitAssignTask && toolkitAssignTask.sign) {
      setStaffImageURL(toolkitAssignTask?.sign);
      setEntries(toolkitAssignTask?.dynamic);
      setIsUpdate(true);
    }
  }, [toolkitAssignTask]);
  const validationSchema = Yup.object({
    // Language fields - optional booleans
    isOthersLang: Yup.boolean(),
    isEnglish: Yup.boolean(),
    isMalay: Yup.boolean(),
    isMandarin: Yup.boolean(),
    jobDescription: Yup.string().required("*Required"),
    otherLang: Yup.string().when("isOthersLang", {
      is: true,
      then: (schema) =>
        schema.required(
          "*This field is required when 'Others' language is selected"
        ),
      otherwise: (schema) => schema, // No specific validation when isOthersLang is false
    }),
    refNumber: Yup.string().required("*Required"),
    conductName: Yup.string().required("*Required"),
    conductRemark: Yup.string().required("*Required"),
    addNotes: Yup.string(),
  }).test(
    "language-selection-validation", // A single name for this combined test
    "Language selection error", // A general message, specific messages will be in createError
    function (value) {
      const { isOthersLang, isEnglish, isMalay, isMandarin } = value;
      const selectedLanguagesCount = [
        isOthersLang,
        isEnglish,
        isMalay,
        isMandarin,
      ].filter(Boolean).length;
      if (selectedLanguagesCount === 0) {
        // No language selected
        return this.createError({
          path: "languageSelection",
          message: "*At least one language must be selected",
        });
      } else if (selectedLanguagesCount > 1) {
        // More than one language selected
        return this.createError({
          path: "languageSelection",
          message: "*Only one language can be selected",
        });
      }
      return true; // Exactly one language is selected
    }
  );
  const isValidDataUrl = (dataUrl) => {
    const regex = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;
    return regex.test(dataUrl);
  };
  const validateArray = (arrayData) => {
    const errors = [];

    if (!arrayData || arrayData.length === 0) {
      errors.push("Array is empty");
      return errors;
    }

    arrayData.forEach((item, index) => {
      const requiredFields = ["name", "remarks", "signature"];

      requiredFields.forEach((field) => {
        if (
          !item[field] ||
          item[field] === null ||
          item[field].toString().trim() === ""
        ) {
          errors.push(`Item ${index + 1}: ${field} is empty or null`);
        }
      });
    });

    return errors;
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isOthersLang: toolkitAssignTask?.isOthersLang || false,
      isEnglish: toolkitAssignTask?.isEnglish || false,
      isMalay: toolkitAssignTask?.isMalay || false,
      isMandarin: toolkitAssignTask?.isMandarin || false,
      jobDescription: toolkitAssignTask?.jobDescription || "",
      otherLang: toolkitAssignTask?.otherLang || "",
      refNumber: toolkitAssignTask?.refNumber || "",
      conductName: toolkitAssignTask?.conductName || "",
      conductRemark: toolkitAssignTask?.conductRemark || "",
      addNotes: toolkitAssignTask?.addNotes || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!isValidDataUrl(staffImageURL)) {
        toast.error("Please sign the staff document first.");
        return;
      }
      const validationErrors = validateArray(entries);
      if (validationErrors.length > 0) {
        toast.error(validationErrors.join(", "));
        return;
      }
      values = {
        ...values,
        taskId: params?.id,
        sign: staffImageURL,
        dynamic: entries,
      };
      dispatch(createToolKitAssignTaskRequest(values));
      resetForm();
      navigate("/");
    },
  });
  const [entries, setEntries] = useState([
    { name: "", remarks: "", signature: null },
  ]);
  const [openSigIndex, setOpenSigIndex] = useState(null);
  const sigRefs = useRef([]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const handleAdd = () => {
    setEntries([...entries, { name: "", remarks: "", signature: null }]);
  };

  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
    sigRefs.current.splice(index, 1); // Remove the ref
  };

  const saveSignature = (index) => {
    const dataUrl = sigRefs.current[index].getTrimmedCanvas().toDataURL();
    handleChange(index, "signature", dataUrl);
    setOpenSigIndex(null);
  };

  const clearSignature = (index) => {
    sigRefs.current[index].clear();
  };
  return (
    <>
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 service_form_wrraper">
          <div className="main_container">
            <div className="header_container custom-border-bottom pb-1">
              <div className="container-fluid py-3">
                <div className="row align-items-center">
                  <div className="col-12 text-start">
                    <h1 className="display-6 m-0 fw-medium">
                      TOOL BOX MEETING
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="body_main_container">
              <form onSubmit={formik.handleSubmit}>
                <div className="body_container">
                  <div className="section_1_container "></div>
                  <div className="section_2_container">
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="d-flex ">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="jobDescription"
                            className="form-label m-2"
                          >
                            Job description:
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            className="form-input w-full ps-2 m-2"
                            type="text"
                            id="jobDescription"
                            name="jobDescription"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Job Description"
                            value={formik.values.jobDescription}
                            disabled={isUpdate ? true : false}
                          />
                          {formik.touched.jobDescription &&
                            formik.errors.jobDescription && (
                              <div className="red">
                                {formik.errors.jobDescription}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="d-flex row flex-column flex-md-row pe-3">
                        <div className="col-md-4 col-sm-6">
                          <label
                            htmlFor="due_date"
                            className="form-label m-2 text-base fw-bold"
                          >
                            Tool Box Meeting Conducted In:
                          </label>
                        </div>
                        <div className="col-md-2 col-sm-3 d-flex align-items-center">
                          <label htmlFor="isEnglish" className="form-label m-2">
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isEnglish"
                              name="isEnglish"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isEnglish}
                              disabled={isUpdate ? true : false}
                            />
                            English
                          </label>
                        </div>

                        <div className="col-md-2 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isMandarin"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isMandarin"
                              name="isMandarin"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isMandarin}
                              disabled={isUpdate ? true : false}
                            />
                            Mandarin
                          </label>
                        </div>

                        <div className="col-md-2 col-sm-3 d-flex align-items-center ">
                          <label htmlFor="isMalay" className="form-label m-2">
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isMalay"
                              name="isMalay"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isMalay}
                              disabled={isUpdate ? true : false}
                            />
                            Malay
                          </label>
                        </div>
                        <div className="col-md-2 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isOthersLang"
                            className="form-label m-2"
                          >
                            <input
                              className="me-2"
                              type="checkbox"
                              id="isOthersLang"
                              name="isOthersLang"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.isOthersLang}
                              disabled={isUpdate ? true : false}
                            />
                            Others
                          </label>
                        </div>
                        {formik.errors.languageSelection && (
                          <div className="red ps-3">
                            {formik.errors.languageSelection}
                          </div>
                        )}
                      </div>
                      {formik?.values?.isOthersLang &&
                      !formik?.values?.isEnglish &&
                      !formik?.values?.isMalay &&
                      !formik?.values?.isMandarin ? (
                        <div className="d-flex ">
                          <div className="col-md-12 col-sm-3 d-flex align-items-center">
                            <input
                              className="form-input w-full ps-2 m-2"
                              type="text"
                              id="otherLang"
                              name="otherLang"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Other language"
                              disabled={isUpdate ? true : false}
                            />
                            {formik.touched.otherLang &&
                              formik.errors.otherLang && (
                                <div className="red">
                                  {formik.errors.otherLang}
                                </div>
                              )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="section_3_container">
                    <div className="fw-bold p-2">
                      Topics Discussed: (Quality / Safety / Health /
                      Environment)
                    </div>
                    <div className="d-flex row flex-column flex-md-row pe-3">
                      <div className="d-flex ">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckTheOperationOfTheWaterDispenser"
                            className="form-label m-2"
                          >
                            1. PPEs: Safety Helmets, Safety Boots, Gloves,
                            Goggles, Ear plugs, Safety Hardness
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckAllOpertionInWorkinigCondition"
                            className="form-label m-2"
                          >
                            2. Barricade Workplace/Jobsite if necessary. See
                            Risk Assessment
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckAndDismantle"
                            className="form-label m-2"
                          >
                            3. Supervisor to ensure quality of the work is
                            fulfilled before signing of service report
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckWireForLoose"
                            className="form-label m-2"
                          >
                            4. Forklift (If any) only drives by forklift license
                            holder, no speeding, seek assistance when
                            manoeuvring or blind spots
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCheckRemoveAndReplacment"
                            className="form-label m-2"
                          >
                            5. No horse-playing / drinking / fighting at all
                            times
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-6 col-sm-3 d-flex align-items-center ">
                          <label
                            htmlFor="isCleanFilterComapartment"
                            className="form-label m-2"
                          >
                            6. No smoking at jobsite or workplace at all times
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isCleanMachineSurface"
                            className="form-label m-2"
                          >
                            7. Be alert and maintain communicate with each other
                            in need to during work activities
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            8. When faced with unsafe condition / act, stop and
                            clarity. Ask when in doubt
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            9. Please inform Person-In-Charge before leaving for
                            break, lunch or job completion
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            10. No disposal of unwanted chemical into the
                            environment without instructions
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            11. Any workplace incident MUST BE REPORTED
                            IMMEDIATELY to supervisor in charge
                          </label>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-12 col-sm-3 d-flex align-items-center">
                          <label
                            htmlFor="isWashFilterbag"
                            className="form-label m-2"
                          >
                            12. Risk Assessment and Safe Work Produce for
                            today’s work have been brief / worker’s feedback /
                            feedback notes.
                          </label>
                        </div>
                      </div>
                      <div className="d-flex ">
                        <div className="col-md-5 col-sm-12 d-flex align-items-center">
                          <label
                            htmlFor="isWaterMeterReading"
                            className="form-label m-2"
                          >
                            Reference number:
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-3 d-flex align-items-center">
                          <input
                            id="refNumber"
                            type="number"
                            name="refNumber"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Ref no."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.refNumber}
                            aria-label="refNumber"
                            disabled={isUpdate ? true : false}
                          />
                          {formik.touched.refNumber &&
                            formik.errors.refNumber && (
                              <div className="red">
                                {formik.errors.refNumber}
                              </div>
                            )}
                        </div>
                        <div className="col-md-1 col-sm-3 d-flex align-items-center justify-content-center">
                          {isUpdate ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => setIsAddNotes(true)}
                            >
                              Add Notes
                            </button>
                          )}
                        </div>
                      </div>
                      {isAddNotes ? (
                        <div className="d-flex ">
                          <div className="col-md-12 col-sm-3 d-flex align-items-center">
                            <input
                              className="form-input w-full ps-2 m-2"
                              type="text"
                              id="addNotes"
                              name="addNotes"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Add notes"
                              disabled={isUpdate ? true : false}
                            />
                            {formik.touched.addNotes &&
                              formik.errors.addNotes && (
                                <div className="red">
                                  {formik.errors.addNotes}
                                </div>
                              )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="section_4_container">
                    <label className="form-label m-2 font-bold">
                      The following members were present during Tool Box
                      Meeting. They have understood the details of the work
                      contents and are aware of the Health & Safety issues
                      associate with all works and requirements concerned.
                    </label>
                    {entries.map((entry, index) => (
                      <div
                        className="d-flex flex-wrap justify-content-between align-items-start mb-4 border-bottom p-3"
                        key={index}
                      >
                        {/* Title + Remarks Section */}
                        <div
                          className="flex-grow-1 me-3"
                          style={{ minWidth: "280px", maxWidth: "60%" }}
                        >
                          <input
                            type="text"
                            className="form-input w-full ps-3 m-2"
                            placeholder="Name"
                            value={entry.name}
                            onChange={(e) =>
                              handleChange(index, "name", e.target.value)
                            }
                            disabled={isUpdate ? true : false}
                          />
                          <textarea
                            className="form-input w-full ps-3 m-2"
                            placeholder="Remarks..."
                            value={entry.remarks}
                            onChange={(e) =>
                              handleChange(index, "remarks", e.target.value)
                            }
                            rows={3}
                            disabled={isUpdate ? true : false}
                          />
                        </div>

                        {/* Signature Section */}
                        <div
                          className="text-center me-3"
                          style={{ minWidth: "300px", maxWidth: "300px" }}
                        >
                          <img
                            src={entry.signature || left}
                            alt="signature"
                            className="img-fluid border"
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "contain",
                              cursor: "pointer",
                            }}
                            onClick={() => setOpenSigIndex(index)}
                          />
                          {isUpdate
                            ? ""
                            : entry.signature && (
                                <button
                                  className="btn btn-sm btn-outline-primary mt-2"
                                  onClick={() =>
                                    handleChange(index, "signature", null)
                                  }
                                >
                                  Clear Signature
                                </button>
                              )}
                        </div>

                        {/* Delete Button */}
                        {isUpdate ? (
                          ""
                        ) : (
                          <div className="d-flex align-items-start pe-5">
                            <i
                              className="fas fa-trash-alt text-danger fs-4"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(index)}
                            ></i>
                          </div>
                        )}

                        {/* Signature Popup */}
                        {isUpdate ? (
                          ""
                        ) : (
                          <Popup
                            modal
                            open={openSigIndex === index}
                            onClose={() => setOpenSigIndex(null)}
                            closeOnDocumentClick={false}
                          >
                            {(close) => (
                              <>
                                <SignaturePad
                                  ref={(el) => (sigRefs.current[index] = el)}
                                  canvasProps={{ className: "signatureCanvas" }}
                                />
                                <div className="d-flex justify-content-center gap-2 mt-2">
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      saveSignature(index);
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => clearSignature(index)}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={close}
                                  >
                                    Close
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        )}
                      </div>
                    ))}

                    <div className="d-flex justify-content-center">
                      {isUpdate ? (
                        ""
                      ) : (
                        <button className="btn btn-primary" onClick={handleAdd}>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="section_5_container">
                    <label className="form-label m-2 font-bold">
                      Conducted By:
                    </label>
                    <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 border-bottom p-3">
                      {/* Title + Remarks Section */}
                      <div
                        className="flex-grow-1 me-3"
                        style={{ minWidth: "280px", maxWidth: "60%" }}
                      >
                        <input
                          type="text"
                          id="conductName"
                          name="conductName"
                          className="form-input w-full ps-3 m-2"
                          placeholder="Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.conductName}
                          disabled={isUpdate ? true : false}
                        />
                        {formik.touched.conductName &&
                          formik.errors.conductName && (
                            <div className="red">
                              {formik.errors.conductName}
                            </div>
                          )}
                        <textarea
                          className="form-input w-full ps-3 m-2"
                          placeholder="Remarks..."
                          id="conductRemark"
                          name="conductRemark"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          rows={3}
                          value={formik.values.conductRemark}
                          disabled={isUpdate ? true : false}
                        />
                        {formik.touched.conductRemark &&
                          formik.errors.conductRemark && (
                            <div className="red">
                              {formik.errors.conductRemark}
                            </div>
                          )}
                      </div>

                      {/* Signature Section */}
                      <div
                        className="text-center me-3"
                        style={{ minWidth: "300px", maxWidth: "300px" }}
                      >
                        <img
                          src={staffImageURL || left}
                          alt="signature"
                          className="img-fluid border"
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() => setIsStaffOpen(true)}
                        />
                        {isUpdate
                          ? ""
                          : staffImageURL && (
                              <button
                                className="btn btn-sm btn-outline-primary mt-2"
                                onClick={() => setIsStaffOpen(true)}
                              >
                                Clear Signature
                              </button>
                            )}
                      </div>

                      {/* Signature Popup */}
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
                  </div>

                  <div className="section_6_container">
                    <div className="d-flex justify-content-center mt-3 px-2">
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
                    </div>
                  </div>
                  <div className="section_7_container">
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

export default ToolKitForm;
