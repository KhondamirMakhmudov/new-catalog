import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { isArray, get, forEach, isObject, values } from "lodash";

const postRequest = (url, attributes, config = {},axios=request) =>
    axios.post(url, attributes, {
    ...config,
    headers: {
      ...config.headers, // Qo'shimcha headers
    },
  });

const usePostQuery = ({
  hideSuccessToast = false,
  listKeyId = null,
  hideErrorToast = false, axios=request
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    ({ url, attributes, config = {} }) => postRequest(url, attributes, config,axios),
    {
      onSuccess: (data) => {
        if (!hideSuccessToast) {
          toast.success(t(data?.data?.message) || t("SUCCESS"));
        }

        if (listKeyId) {
          if (isArray(listKeyId)) {
            forEach(listKeyId, (val) => {
              queryClient.invalidateQueries(val);
            });
          } else {
            queryClient.invalidateQueries(listKeyId);
          }
        }
      },
      onError: (data) => {
        if (isArray(get(data, "response.data"))) {
          forEach(get(data, "response.data"), (val) => {
            toast.error(t(get(val, "message", "ERROR")));
          });
        } else if (isObject(get(data, "response.data"))) {
          forEach(values(get(data, "response.data")), (val) => {
            toast.error(val, { position: "top-right" });
          });
        } else {
          if (!hideErrorToast) {
            toast.error(t(data?.response?.data?.message) || t("ERROR"));
          }
        }
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export default usePostQuery;
