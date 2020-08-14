import { NearbyIndices } from '../State'

test('nearby indices calc', () => {
    expect(NearbyIndices(0, 15, 15).sort()).toEqual([ 1, 14, 15, 16 ].sort())
    expect(NearbyIndices(224, 15, 15).sort()).toEqual([ 223, 208, 209 ].sort())
    expect(NearbyIndices(7, 10, 12).sort()).toEqual([ 6, 8, 16, 17, 18 ].sort())
    expect(NearbyIndices(123, 15, 15).sort()).toEqual(
        [ 122, 124, 107, 108, 109, 137, 138, 139 ].sort()
    )
})
