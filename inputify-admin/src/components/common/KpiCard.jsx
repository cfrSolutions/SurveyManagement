function KpiCard({
  title,
  value,
  icon,
  trend
}) {

  return (

    <div className="kpi-card">

      <div className="kpi-header">

        <div>

          <p className="kpi-title">
            {title}
          </p>

          <h2 className="kpi-value">
            {value}
          </h2>

          {
            trend && (
              <span className="kpi-trend">
                {trend}
              </span>
            )
          }

        </div>

        {
          icon && (
            <div className="kpi-icon">
              {icon}
            </div>
          )
        }

      </div>

    </div>

  );

}

export default KpiCard;