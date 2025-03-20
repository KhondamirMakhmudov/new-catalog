import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const putRequest = (url, attributes, config = {}) =>
  request.put(url, attributes, {
    ...config,
    headers: {
      ...config.headers, // Qo'shimcha headers qo'shish
    },
  });

const usePutQuery = ({
  hideSuccessToast = false,
  listKeyId = null,
  hideErrorToast = false,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    ({ url, attributes, config = {} }) => putRequest(url, attributes, config),
    {
      onSuccess: (data) => {
        if (!hideSuccessToast) {
          toast.success(t(data?.data?.message) || t("SUCCESS"));
        }

        if (listKeyId) {
          queryClient.invalidateQueries(listKeyId);
        }
      },
      onError: (data) => {
        if (!hideErrorToast) {
          toast.error(t(data?.response?.data?.message) || t("ERROR"));
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

export default usePutQuery;
