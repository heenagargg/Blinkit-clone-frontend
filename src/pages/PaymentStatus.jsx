import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
    //   const response = await axios.post("/api/order/verify-payment", { sessionId });
    const response=await Axios({
          ...SummaryApi.verifyPayment,
        data: {
          sessionId:sessionId
        },
    })
      console.log("response--",response)
      if (response.data.paymentStatus === "paid") {
        navigate("/success");
      } else {
        navigate("/cancel");
      }
    };

    verifyPayment();
  }, []);

  return <h2>Checking payment status...</h2>;
}

export default PaymentStatus;
