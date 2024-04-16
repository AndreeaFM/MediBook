import { formateDate } from '../../utils/formateDate'

const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            Popa Laurentiu
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          vel enim gravida, sagittis justo vel, rhoncus velit. Nam ornare mollis
          ex quis condimentum. Duis dignissim, elit sed rutrum condimentum, eros
          justo sagittis tellus, sed blandit nisl urna sit amet dui. Aliquam
          erat volutpat. Vestibulum ligula mi, faucibus ac massa vel, mollis
          egestas arcu. Praesent tincidunt, diam eu mattis faucibus, diam
          lectus.
        </p>
      </div>

      <div className="mt-12  ">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5 ">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate('09-13-2014')} - {formateDate('09-13-2016')}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Spitalul Clinic Județean de Urgență, Ilfov.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate('12-04-2010')} - {formateDate('09-13-2014')}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Spitalul Clinic Județean de Urgență, Ilfov.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[16px] leading-5 font-medium text-textColor">
              Spitalul Clinic Județean de Urgență, Ilfov.
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[16px] leading-5 font-medium text-textColor">
              Spitalul Clinic Județean de Urgență, Ilfov.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DoctorAbout
