import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const assetsAdapter = createEntityAdapter({})

const initialState = assetsAdapter.getInitialState()

export const assetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => ({
        url: '/assets',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: (responseData) => {
        const loadedAssets = responseData.map((asset) => {
          asset.id = asset._id
          return asset
        })
        return assetsAdapter.setAll(initialState, loadedAssets)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Asset', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Asset', id }))
          ]
        } else return [{ type: 'Asset', id: 'LIST' }]
      }
    }),
    addNewAsset: builder.mutation({
      query: (initialAsset) => ({
        url: '/assets',
        method: 'POST',
        body: {
          ...initialAsset
        }
      }),
      invalidatesTags: [{ type: 'Asset', id: 'LIST' }]
    }),
    updateAsset: builder.mutation({
      query: (initialAsset) => ({
        url: '/assets',
        method: 'PATCH',
        body: {
          ...initialAsset
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Asset', id: arg.id }]
    }),
    deleteAsset: builder.mutation({
      query: ({ id }) => ({
        url: '/assets',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Asset', id: arg.id }]
    })
  })
})

export const {
  useGetAssetsQuery,
  useAddNewAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation
} = assetsApiSlice

// return the query result object
export const selectAssetsResult = assetsApiSlice.endpoints.getAssets.select()

// create memoized selector
const selectAssetsData = createSelector(
  selectAssetsResult,
  (assetsResult) => assetsResult.data // normalized state object with ids and entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAssets,
  selectById: selectAssetById,
  selectIds: selectAssetIds
  // pass in a selector that returns the assets slice of state
} = assetsAdapter.getSelectors(
  (state) => selectAssetsData(state) ?? initialState
)
