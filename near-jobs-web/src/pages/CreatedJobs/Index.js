import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as buffer from "buffer";

const CreatedJob = ({ contract }) => {
  window.Buffer = buffer.Buffer;

  const [listings, setListings] = useState([]);
  const history = useHistory();

  async function deleteListing(id) {
    await contract
      .deleteJob({ id: id })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function getListings() {
      await contract
        .getJobs()
        .then((listings) => {
          setListings(
            listings.filter(
              (listing) => listing.postedBy === localStorage.currentUser
            )
          );
        })
        .catch((error) => {
          console.log("error", error);
          // Check if contains
          if (
            JSON.stringify(error, Object.getOwnPropertyNames(error)).includes(
              "is not present in the storage"
            )
          ) {
            console.log("No listings not found");
          }
        });
    }
    getListings();
  }, []);

  return (
    <div className="container content-space-t-1 content-space-t-md-2 content-space-b-2 content-space-b-lg-3">
      <div className="row">
        <div className="col-lg-3 order-lg-2">
          {/* Navbar */}
          <div className="navbar-expand-lg mb-5">
            {/* Navbar Toggle */}
            <div className="d-grid">
              <button
                type="button"
                className="navbar-toggler btn btn-white mb-3"
                data-bs-toggle="collapse"
                data-bs-target="#navbarVerticalNavMenu"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navbarVerticalNavMenu"
              >
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-dark">Filter</span>
                  <span className="navbar-toggler-default">
                    <i className="bi-list" />
                  </span>
                  <span className="navbar-toggler-toggled">
                    <i className="bi-x" />
                  </span>
                </span>
              </button>
            </div>
            {/* End Navbar Toggle */}
            {/* Navbar Collapse */}
            <div
              id="navbarVerticalNavMenu"
              className="collapse navbar-collapse"
            >
              <div className="w-100">
                {/* Form */}
                <form>
                  <div className="mb-5">
                    <h5 className="mb-3">Distance</h5>
                    <p className="form-text">
                      Within <span id="rangeSliderDistance">25</span> miles of{" "}
                      <span className="fw-semi-bold text-dark">London</span>
                    </p>
                    {/* Range Slider */}
                    <div className="range-slider">
                      <div
                        className="js-nouislider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
                        data-hs-nouislider-options='{
                             "range": {
                               "min": 0,
                               "max": 100
                             },
                             "connect": [true, false],
                             "start": 25,
                             "result_min_target_el": "#rangeSliderDistance"
                           }'
                      >
                        <div className="noUi-base">
                          <div className="noUi-connects">
                            <div
                              className="noUi-connect"
                              style={{
                                transform: "translate(0%, 0px) scale(0.25, 1)",
                              }}
                            />
                          </div>
                          <div
                            className="noUi-origin"
                            style={{
                              transform: "translate(-750%, 0px)",
                              zIndex: 4,
                            }}
                          >
                            <div
                              className="noUi-handle noUi-handle-lower"
                              data-handle={0}
                              tabIndex={0}
                              role="slider"
                              aria-orientation="horizontal"
                              aria-valuemin={0.0}
                              aria-valuemax={100.0}
                              aria-valuenow={25.0}
                              aria-valuetext={25.0}
                            >
                              <div className="noUi-touch-area" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <span className="text-body">5 miles</span>
                      <span className="text-body">100 miles</span>
                    </div>
                    {/* End Range Slider */}
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">Last updated</h5>
                    {/* Select */}
                    <select className="form-select form-select-sm">
                      <option value="within last day">within last day</option>
                      <option value="within last week">within last week</option>
                      <option value="within last month">
                        within last month
                      </option>
                      <option value="within last 3 months">
                        within last 3 months
                      </option>
                      <option value="within last 6 months" defaultValue>
                        within last 6 months
                      </option>
                      <option value="show all resumes">show all resumes</option>
                    </select>
                    {/* End Select */}
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">Job titles</h5>
                    <div className="d-grid gap-2">
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobTitleCheckbox1"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobTitleCheckbox1"
                        >
                          Graphic Designer <span className="ms-auto">2</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobTitleCheckbox2"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobTitleCheckbox2"
                        >
                          UI/UX Designer <span className="ms-auto">2</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobTitleCheckbox3"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobTitleCheckbox3"
                        >
                          Full Stack Developer{" "}
                          <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobTitleCheckbox4"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobTitleCheckbox4"
                        >
                          Information Associate{" "}
                          <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">Company</h5>
                    <div className="d-grid gap-2">
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox1"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox1"
                        >
                          Capsule <span className="ms-auto">2</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox2"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox2"
                        >
                          Dropbox <span className="ms-auto">18</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox3"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox3"
                        >
                          Mailchimp <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox4"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox4"
                        >
                          Google <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox5"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox5"
                        >
                          Prosperops <span className="ms-auto">2</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobCompanyCheckbox6"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobCompanyCheckbox6"
                        >
                          Figam <span className="ms-auto">6</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">Years of experience</h5>
                    <div className="d-grid gap-2">
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobYearExperienceCheckbox1"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobYearExperienceCheckbox1"
                        >
                          6-10 years <span className="ms-auto">73</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobYearExperienceCheckbox2"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobYearExperienceCheckbox2"
                        >
                          3-5 years <span className="ms-auto">3</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobYearExperienceCheckbox3"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobYearExperienceCheckbox3"
                        >
                          More than 10 years <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">Education</h5>
                    <div className="d-grid gap-2">
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobEducationCheckbox1"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobEducationCheckbox1"
                        >
                          Bachelors <span className="ms-auto">6</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobEducationCheckbox2"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobEducationCheckbox2"
                        >
                          Masters <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobEducationCheckbox3"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobEducationCheckbox3"
                        >
                          Associates <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h5 className="mb-3">
                      Assessment{" "}
                      <i
                        className="bi-question-circle text-body ml-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Assessments shown her6 are summarized for convenience only. View the candidate’s profile for more information, including score ranges for each assessment. Indeed makes no statement as to the skill level of any candidate."
                        aria-label="Assessments shown her6 are summarized for convenience only. View the candidate’s profile for more information, including score ranges for each assessment. Indeed makes no statement as to the skill level of any candidate."
                      />
                    </h5>
                    <div className="d-grid gap-2">
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobAssessmentCheckbox1"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobAssessmentCheckbox1"
                        >
                          Attention to detail <span className="ms-auto">3</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobAssessmentCheckbox2"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobAssessmentCheckbox2"
                        >
                          Graphic design <span className="ms-auto">7</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobAssessmentCheckbox3"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobAssessmentCheckbox3"
                        >
                          Social Media <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                      {/* Checkboxes */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="jobAssessmentCheckbox4"
                        />
                        <label
                          className="form-check-label d-flex"
                          htmlFor="jobAssessmentCheckbox4"
                        >
                          Marketing <span className="ms-auto">1</span>
                        </label>
                      </div>
                      {/* End Checkboxes */}
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-white btn-transition"
                    >
                      Clear all
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
            {/* End Navbar Collapse */}
          </div>
          {/* End Navbar */}
        </div>
        {/* End Col */}
        <div className="col-lg-9">
          <div className="row align-items-center mb-5">
            <div className="col-sm mb-3 mb-sm-0">
              <h3 className="mb-0">
                {listings.length}
                <span className="fw-normal"> jobs created by you</span>
              </h3>
            </div>
            <div className="col-sm-auto">
              <div className="d-sm-flex justify-content-sm-end align-items-center">
                {/* Select */}
                <div className="mb-2 mb-sm-0 me-sm-2">
                  <select className="form-select form-select-sm">
                    <option value="Relevance" defaultValue>
                      Relevance
                    </option>
                    <option value="mostRecent">Most recent</option>
                  </select>
                </div>
                {/* End Select */}
                {/* Select */}
                <div className="mb-2 mb-sm-0 me-sm-2">
                  <select className="form-select form-select-sm">
                    <option value="alphabeticalOrderSelect1" defaultValue>
                      A-to-Z
                    </option>
                    <option value="alphabeticalOrderSelect2">Z-to-A</option>
                  </select>
                </div>
                {/* End Select */}
                {/* Nav */}
                <ul className="nav nav-segment">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="../demo-jobs/job-grid.html"
                    >
                      <i className="bi-grid-fill" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="../demo-jobs/job-list.html">
                      <i className="bi-list" />
                    </a>
                  </li>
                </ul>
                {/* End Nav */}
              </div>
            </div>
          </div>
          {/* End Row */}
          <div className="row row-cols-1 row-cols-sm-2 mb-5">
            {/* Job Card Start */}
            {listings.length > 0 ? (
              listings.map((job, key) => (
                <div className="col mb-5">
                  {/* Card */}
                  <div className="card card-bordered h-100">
                    {/* Card Body */}
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col">
                          {/* Media */}
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="avatar avatar-sm avatar-4x3"
                                src={job.organizationLogoUrl}
                                alt="Organization Logo"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="card-title">
                                <a
                                  className="text-dark"
                                  href="../demo-jobs/employer.html"
                                >
                                  {job.organization}
                                </a>
                              </h6>
                            </div>
                          </div>
                          {/* End Media */}
                        </div>
                        {/* End Col */}
                        <div className="col-auto">
                          {/* Checkbbox Bookmark */}
                          <div className="form-check form-check-bookmark">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="jobsCardBookmarkCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="jobsCardBookmarkCheck1"
                            >
                              <div className="d-flex">
                                <Link
                                  to={`/dashboard/created-jobs/job/${job.id}`}
                                >
                                  <span
                                    className="form-check-bookmark-default btn btn-sm text-primary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Save this job"
                                  >
                                    <i className="bi bi-box-arrow-in-left me-2"></i>
                                    View
                                  </span>
                                </Link>
                                <span
                                  className="form-check-bookmark-default btn btn-sm text-danger"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="Save this job"
                                  onClick={() => deleteListing(job.id)}
                                >
                                  <i className="bi bi-trash-fill me-2"></i>
                                </span>
                              </div>
                            </label>
                          </div>
                          {/* End Checkbbox Bookmark */}
                        </div>
                        {/* End Col */}
                      </div>
                      {/* End Row */}
                      <h3 className="card-title">
                        <a
                          className="text-dark"
                          href="../demo-jobs/employer.html"
                        >
                          {job.title}
                        </a>
                      </h3>
                      <span className="d-block small text-body mb-1">
                        {job.salary}
                      </span>
                      <span className="badge bg-soft-info text-info me-2">
                        <span className="legend-indicator bg-info" />
                        {job.isRemote ? "Remote" : "Local"}
                      </span>
                    </div>
                    {/* End Card Body */}
                    {/* Card Footer */}
                    <div className="card-footer pt-0">
                      <ul className="list-inline list-separator small text-body">
                        <li className="list-inline-item">
                          Posted {job.createdAt}
                        </li>
                        <li className="list-inline-item">{job.postedBy}</li>
                        <li className="list-inline-item">{job.type}</li>
                      </ul>
                    </div>
                    {/* End Card Footer */}
                  </div>
                  {/* End Card */}
                </div>
              ))
            ) : (
              <div>No Jobs Available</div>
            )}
            {/* Job Card End */}
            {/* End Col */}
          </div>
          {/* End Row */}
          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">
                    <i className="bi-chevron-double-left small" />
                  </span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">
                    <i className="bi-chevron-double-right small" />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          {/* End Pagination */}
        </div>
        {/* End Col */}
      </div>
      {/* End Row */}
    </div>
  );
};

export default CreatedJob;
