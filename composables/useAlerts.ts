import { nanoid } from "nanoid";

interface AlertOptions {
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  dismissiable?: boolean;
  timeout?: number;
}
interface Alert extends AlertOptions {
  message: string;
  id: string;
}

export const useAlerts = () => {
  const alerts = useState<Alert[]>("alerts", () => []);

  function dismiss(idOrAlert: string | Alert) {
    const id = typeof idOrAlert === "object" ? idOrAlert.id : idOrAlert;

    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }

  function addAlert(message: string, options: AlertOptions = {}) {
    const id = nanoid();

    const alert: Alert = {
      id,
      message,
      type: options.type || "info",
      dismissiable: options.dismissiable || false,
      timeout: options.timeout,
    };

    alerts.value.push(alert);

    if (alert.timeout) {
      setTimeout(() => dismiss(alert.id), Number(alert.timeout));
    }
  }

  function success(message: string, options: AlertOptions = {}) {
    addAlert("SUCCESS: " + message, options);
  }

  function error(message: string, options: AlertOptions = {}) {
    addAlert("ERROR: " + message, options);
  }

  function info(message: string, options: AlertOptions = {}) {
    addAlert("INFO: " + message, options);
  }

  function warning(message: string, options: AlertOptions = {}) {
    addAlert("WARNING: " + message, options);
  }

  return {
    success,
    info,
    warning,
    error,
    alerts,
    dismiss,
  };
};
